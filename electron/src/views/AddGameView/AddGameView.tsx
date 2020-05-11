import React from 'react';
import { useHistory } from 'react-router-dom';

import GameFormComponent from '../../shared/components/GameFormComponent';
import PageTitleComponent from '../../shared/components/PageTitleComponent';
import { Games } from '../../shared/helpers/Games';
import { routes } from '../../shared/constants/routes';

interface Props {}

const AddGameView: React.FC<Props> = function () {
  const history = useHistory();

  return (
    <> 
      <PageTitleComponent title="Add a Game" />
      <GameFormComponent 
        onSubmit={(values): void => {
          Games.addNew({
            ...values, 
            image: {
              name: values.image!, 
              bannerPos: { 
                x: values.xAxis.toString(), 
                y: values.yAxis.toString(),
              },
            },
          });
          history.replace(routes.gameLinks.replace(':gameID', values.id));
        }}
      />
    </>
  );
};

export default AddGameView;
