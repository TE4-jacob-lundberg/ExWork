import React from 'react';
import { routerFactory } from '../../../shared/helpers/TestFactory';

import GameView from '../GameView';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: (): object => ({
    gameID: 'csgo',
  }),
}));

const testComponent = <GameView />;

describe('GameView.tsx', () => {
  it('renders correctly', () => {
    const { container } = routerFactory(testComponent);
    
    expect(container).toMatchSnapshot();
  });
});
