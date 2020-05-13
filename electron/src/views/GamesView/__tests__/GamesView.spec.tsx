import React from 'react';

import { routerFactory } from '../../../shared/helpers/TestFactory';
import GamesView from '../GamesView';

jest.mock('../../../shared/helpers/BrowserElectron.ts', () => {
  return {
    electron: {
      ipcRenderer: {
        on: jest.fn(),
        removeListener: jest.fn(),
      },
    },
  };
});

jest.mock('react-indexed-db', () => ({
  useIndexedDB: (): object => {
    return {
      getAll: (): Promise<[]> => Promise.resolve([]),
    };
  },
}));

describe('GamesView.tsx', () => {
  it('renders correctly', () => {
    const { container } = routerFactory(<GamesView />);

    expect(container).toMatchSnapshot();
  });
});
