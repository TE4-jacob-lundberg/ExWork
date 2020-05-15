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

  it.skip('submits with the correct values', () => {
    const { getByText, getByLabelText} = factory(testComponent);

    fireEvent.change(getByLabelText('Title*'), { target: { value: 'test-title' }});
    fireEvent.change(getByLabelText('Abbreviation'), { target: { value: 'test-abbr' }});
    
    fireEvent.click(getByText('Save'));

    waitForElement(() => getByLabelText('Abbreviation')).then(() => {
      expect(mockedSubmit).toHaveBeenCalledWith({
        id: 'test', title: 'test-title', abbreviation: 'test-abbr', image: '', xAxis: '50', yAxis: '0', links: [], fileNames: [],
      });
    });
  });
});
