import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useIndexedDB } from 'react-indexed-db';

import GameFormComponent from '../../shared/components/GameFormComponent';
import PageTitleComponent from '../../shared/components/PageTitleComponent';
import ModalComponent from '../../shared/components/ModalComponent';
import { routes } from '../../shared/constants/routes';
import { IGame } from '../../shared/helpers/Types';

interface Props {}

interface Params {
  gameID: string;
}

const AddGameView: React.FC<Props> = function () {
  const params = useParams<Params>();
  const [initialGame, setInitialGame] = useState<IGame>();
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const db = useIndexedDB('games');

  useEffect(() => {
    if (initialGame) return;
    db.getByID(params.gameID).then((resp: IGame) => setInitialGame(resp));
  }, [db, initialGame, params.gameID]);

  return (
    <> 
      <PageTitleComponent title="Edit game" />
      {initialGame && <GameFormComponent 
        initialValues={{
          title: initialGame.title,
          abbreviation: initialGame.abbreviation || '',
          image: initialGame.image.url,
          xAxis: initialGame.image.bannerPos.x,
          yAxis: initialGame.image.bannerPos.y,
          fileNames: initialGame.fileNames,
        }}
        onSubmit={(values): void => {
          db.update({
            ...values, 
            id: initialGame.id,
            links: initialGame.links,
            image: {
              url: values.image, 
              bannerPos: { 
                x: values.xAxis.toString(), 
                y: values.yAxis.toString(),
              },
            },
          }).then(() => history.push(routes.showGame.replace(':gameID', initialGame.id)));
        }}
        onDelete={(): void => {
          setShowModal(true);
        }}
        deletable
      />}
      {showModal && initialGame && <ModalComponent 
        title="Deleting a game"
        onClose={(): void => setShowModal(false)}
        continueLabel="Yes, delete it"
        onContinue={(): void => {
          db.deleteRecord(initialGame.id).then(() => history.push(routes.games));
        }}
        cancelLabel="No, go back"
        onCancel={(): void => setShowModal(false)}
        cancelAble
      >
        <h3>{`Are you sure you want to delete "${initialGame!.title}"`}</h3>  
      </ModalComponent>}
    </>
  );
};

export default AddGameView;
