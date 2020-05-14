import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { css, jsx } from '@emotion/core'; // eslint-disable-line @typescript-eslint/no-unused-vars
import Styled from '@emotion/styled';

import { routes } from './shared/constants/routes';
import GamesView from './views/GamesView';
import GameView from './views/GameView';
import AddGameView from './views/AddGameView';
import ButtonComponent from './shared/components/ButtonComponent';

/* @jsx jsx */

interface Props {}

const AppRouter: React.FC<Props> = function () {
  const history = useHistory();

  const ContainerStyled = Styled.div`
    height: 70vh;
    width: 70vw;
    color: white;
    display: flex;
    justify-content: center;
    position: relative;
  `;

  if (history.location.pathname === '/') history.push(routes.games);

  return (
    <ContainerStyled>
      {history.location.pathname !== routes.games && 
      <ButtonComponent 
        onClick={(): void => history.goBack()} 
        iconSize="48px"
        styling={css`
          position: absolute;
          top: 0;
          left: -100px;
          z-index: 999;
      `}>
        <i className="material-icons">
          keyboard_backspace
        </i>
      </ButtonComponent>}
      <Switch>
        <Route path={routes.games} component={GamesView} exact />
        <Route path={routes.addGame} component={AddGameView} exact />
        <Route path={routes.gameLinks} component={GameView} />
      </Switch>
    </ContainerStyled>
  );
};

export default AppRouter;
