import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';

import { factory } from '../../../shared/helpers/TestFactory';
import SettingsView from '../SettingsView';
import { EventBus } from '../../../shared/helpers/EventBus';
import { IKeybind } from '../../../shared/helpers/Types';

jest.mock('../../../shared/helpers/EventBus');

jest.mock('react-indexed-db', () => ({
  useIndexedDB: (): object => {
    return {
      clear: (): Promise<void> => Promise.resolve(),
      getAll: (): Promise<IKeybind[]> => Promise.resolve([
        { name: 'Test Keybind', key: 'F10'},
      ]),
    };
  },
}));

const testComponent = <SettingsView />;

describe('SettingsView.tsx', () => {
  it('renders correctly', () => {
    const { container } = factory(testComponent);
    
    expect(container).toMatchSnapshot();
  });

  it('allows resetting games', async () => {
    const { getByText, queryByText } = factory(testComponent);

    fireEvent.click(getByText('RESET GAMES'));
    await waitForElement(() => getByText('Are you sure?'));

    fireEvent.click(getByText('Continue'));
    await waitForElement(() => !queryByText('Are you sure?'));

    expect(EventBus.dispatch).toHaveBeenCalledTimes(1);
  });
});
