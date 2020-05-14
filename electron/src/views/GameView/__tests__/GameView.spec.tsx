import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';

import { routerFactory } from '../../../shared/helpers/TestFactory';
import GameView from '../GameView';
import { IGame } from '../../../shared/helpers/Types';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: (): object => ({
    gameID: 'csgo',
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
          url: '',
          bannerPos: {
            x: '0',
            y: '0',
          },
        },
        links: [
          { label: 'testWiki', url: 'test.com'},
        ],
        fileNames: ['test.exe'],
      }),
      update: (): Promise<void> => Promise.resolve(),
    };
  },
}));

const testComponent = <GameView />;

describe('GameView.tsx', () => {
  it('renders correctly', (done) => {
    const { container, getByTestId } = routerFactory(testComponent);
    
    waitForElement(() => getByTestId('page-title')).then(() => {
      expect(container).toMatchSnapshot();
      done();
    });
  });

  it('allows to to add links', async () => {
    const { queryByText, getByText, getByTestId, getByLabelText } = routerFactory(testComponent);

    await waitForElement((() => fireEvent.click(getByTestId('add-link'))));
    expect(getByText('Add link')).toBeTruthy();

    fireEvent.change(getByLabelText('Label'), { input: 'newTestLabel' });
    fireEvent.click(getByText('Save'));

    await waitForElement(() => !queryByText('Add link'));
  });
});
