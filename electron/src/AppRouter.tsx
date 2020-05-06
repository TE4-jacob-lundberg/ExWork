import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Styled from '@emotion/styled';

import { routes } from './shared/constants/routes';
import GamesView from './views/GamesView';
import GameView from './views/GameView';
import GoBackButtonComponent from './shared/components/GoBackButtonComponent';

interface Props {}

const AppRouter: React.FC<Props> = function () {
  const ContainerStyled = Styled.div`
    height: 70vh;
    width: 70vw;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <BrowserRouter>
      <Switch>
        <ContainerStyled>
          <GoBackButtonComponent />
          <Route path={routes.games} component={GamesView} exact />
          <Route path={routes.gameLinks} component={GameView} />
        </ContainerStyled>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
