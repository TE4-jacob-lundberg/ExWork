import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIndexedDB } from 'react-indexed-db';

import GameFormComponent from '../../shared/components/GameFormComponent';
import PageTitleComponent from '../../shared/components/PageTitleComponent';
import { routes } from '../../shared/constants/routes';

interface Props {}

const AddGameView: React.FC<Props> = function () {
  const history = useHistory();
  const db = useIndexedDB('games');

  return (
    <> 
      <PageTitleComponent title="Add a Game" />
      <GameFormComponent 
        onSubmit={(values): void => {
          db.add({
            ...values, 
            links: [],
            image: {
              url: values.image, 
              bannerPos: { 
                x: values.xAxis.toString(), 
                y: values.yAxis.toString(),
              },
            },
          }).then(resp => history.replace(routes.showGame.replace(':gameID', resp.toString())));
        }}
      />
    </>
  );
};

export default AddGameView;
