import React from 'react';

import { routerFactory } from '../../../shared/helpers/TestFactory';
import GameView from '../GameView';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: (): object => ({
    gameID: 'csgo',
  }),
}));

jest.mock('react-indexed-db', () => ({
  useIndexedDB: (): object => {
    return {
      getByID: (): Promise<void> => Promise.resolve(),
    };
  },
}));

const testComponent = <GameView />;

describe('GameView.tsx', () => {
  it('renders correctly', () => {
    const { container } = routerFactory(testComponent);
    
    expect(container).toMatchSnapshot();
  });
});
