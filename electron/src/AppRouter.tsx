import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import GamesView from './views/GamesView';
import { routes } from './shared/constants/routes';

interface Props {}

const AppRouter: React.FC<Props> = function () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.home} component={GamesView} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
