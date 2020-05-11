import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';

import { factory } from '../../helpers/TestFactory';
import GameFormComponent from '../GameFormComponent';

const mockedSubmit = jest.fn();

const testComponent = <GameFormComponent 
  onSubmit={mockedSubmit}
/>;

describe('GameFormComponent.tsx', () => {
  it('renders correctly', () => {
    const { container } = factory(testComponent);
    
    expect(container).toMatchSnapshot();
  });

  it('submits with the correct values', () => {
    const { getByTestId } = factory(testComponent);

    fireEvent.change(getByTestId('game-id'), { target: { value: 'test' }});
    fireEvent.change(getByTestId('game-title'), { target: { value: 'test-title' }});
    fireEvent.change(getByTestId('game-abbr'), { target: { value: 'test-abbr' }});
    
    fireEvent.click(getByTestId('submit-form'));

    waitForElement(() => getByTestId('game-abbr')).then(() => {
      expect(mockedSubmit).toHaveBeenCalledWith({
        id: 'test', title: 'test-title', abbreviation: 'test-abbr', image: '', xAxis: '50', yAxis: '0', links: [], fileNames: [],
      });
    });
  });
});
