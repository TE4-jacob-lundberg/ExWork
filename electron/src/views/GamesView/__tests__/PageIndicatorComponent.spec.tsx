import React from 'react';
import { fireEvent } from '@testing-library/react';

import { factory } from '../../../shared/helpers/TestFactory';
import PageIndicatorComponent from '../components/PageIndicatorComponent';

const mockedSelect = jest.fn();

const testComponent = <PageIndicatorComponent 
  totalPages={2}
  currentPage={0}
  onSelect={mockedSelect}
/>;

describe('PageIndicatorComponent.tsx', () => {
  it('renders correctly', () => {
    const { container } = factory(testComponent);
    
    expect(container).toMatchSnapshot();
  });

  it('updates whenever the page changes', () => {
    const { container, rerender } = factory(testComponent);

    expect(container).toMatchSnapshot();

    rerender(<PageIndicatorComponent 
      totalPages={2}
      currentPage={1}
      onSelect={jest.fn()}
    />);

    expect(container).toMatchSnapshot();
  });

  it('returns the new page on select', () => {
    const { getAllByTestId } = factory(testComponent );

    fireEvent.click(getAllByTestId('indicator')[1]);

    expect(mockedSelect).toHaveBeenCalledWith(1);
  });
});
