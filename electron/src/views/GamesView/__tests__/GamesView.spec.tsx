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

describe('GamesView.tsx', () => {
  it('renders correctly', () => {
    const { container } = routerFactory(<GamesView />);
     
    expect(container).toMatchSnapshot();
  });
});
