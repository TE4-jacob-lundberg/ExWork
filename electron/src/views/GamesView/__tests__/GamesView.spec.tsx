import React from 'react';

import { routerFactory } from '../../../shared/helpers/TestFactory';
import GamesView from '../GamesView';


describe('GamesView.tsx', () => {
  it('renders correctly', () => {
    const { container } = routerFactory(<GamesView />);
     
    expect(container).toMatchSnapshot();
  });
});
