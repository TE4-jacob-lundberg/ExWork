import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Styled from '@emotion/styled';

import { routes } from './shared/constants/routes';
import GamesView from './views/GamesView';
import GameView from './views/GameView';

interface Props {}

const AppRouter: React.FC<Props> = function () {
  const ContainerStyled = Styled.div`
    height: 70vh;
    width: 70vw;
    color: white;
  `;

  return (
    <BrowserRouter>
      <Link to='/'>HOME</Link>
      <Switch>
        <ContainerStyled>
          <Route path={routes.games} component={GamesView} exact />
          <Route path={routes.gameLinks} component={GameView} />
        </ContainerStyled>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
