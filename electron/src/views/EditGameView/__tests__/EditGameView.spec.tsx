import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { routerFactory } from '../../../shared/helpers/TestFactory';
import { IGame } from '../../../shared/helpers/Types';
import EditGameView from '../EditGameView';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: (): object => ({
    gameID: '0',
  }),
}));

jest.mock('react-indexed-db', () => ({
  useIndexedDB: (): object => {
    return {
      getByID: (): Promise<IGame> => Promise.resolve({
        id: '1',
        title: 'testTitle',
        abbreviation: 'testAbbr',
        image: {
          url: 'test',
          bannerPos: {
            x: '0',
            y: '0',
          },
        },
        links: [
          { type: 'link', label: 'testWiki', url: 'test.com'},
        ],
        fileNames: ['test.exe'],
      }),
      deleteRecord: (): Promise<void> => Promise.resolve(),
    };
  },
}));

const testComponent = <EditGameView />;

describe('EditGameView.tsx', () => {
  it('renders correctly', async () => {
    const { container, getByText } = routerFactory(testComponent);

    await waitForElement(() => getByText('Save'));
    expect(container).toMatchSnapshot();
  });

  it('allows for game to be deleted', async () => {
    const history = createMemoryHistory();
    const { getByText, queryByText, getByTestId } = routerFactory(testComponent, {history});

    await waitForElement(() => getByText('Save'));
    fireEvent.click(getByText('Delete'));
    expect(getByText('Deleting a game')).toBeTruthy();

    fireEvent.click(getByTestId('continue-modal'));

    await waitForElement(() => queryByText('Deleting a game'));
    expect(history.location.pathname).toBe('/games');
  });
});
