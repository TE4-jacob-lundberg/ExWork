import React from 'react';

import { routerFactory } from '../../../shared/helpers/TestFactory';
import AddGameView from '../AddGameView';

jest.mock('react-indexed-db', () => ({
  useIndexedDB: (): object => {
    return {};
  },
}));

const testComponent = <AddGameView />;

describe('AddGameView.tsx', () => {
  it('renders correctly', () => {
    const { container } = routerFactory(testComponent);
    
    expect(container).toMatchSnapshot();
  });
});
