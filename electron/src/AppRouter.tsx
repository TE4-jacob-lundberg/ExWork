import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomeView from './views/HomeView';

import { routes } from './constants/routes';

interface Props {}

const AppRouter: React.FC<Props> = function () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.home} component={HomeView} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
