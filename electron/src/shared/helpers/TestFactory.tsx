/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export function factory(component: JSX.Element): RenderResult {
  return render(component);
}

export function routerFactory(component: JSX.Element, options: any = { history: createBrowserHistory() }): RenderResult {
  return factory(
    <Router history={options.history}>
      {component}
    </Router>
  );
}
