import React from 'react';
import { fireEvent } from '@testing-library/react';

import { factory } from '../../helpers/TestFactory';
import ButtonComponent from '../ButtonComponent';

const mockedClick = jest.fn();

const testComponent = <ButtonComponent
  onClick={mockedClick}
>
  Click me
</ButtonComponent>;

describe('ButtonComponent.tsx', () => {
  it('renders correctly', () => {
    const { container } = factory(testComponent);
    
    expect(container).toMatchSnapshot();
  });

  it('reacts on click', () => {
    const { getByText } = factory(testComponent);

    fireEvent.click(getByText('Click me'));

    expect(mockedClick).toHaveBeenCalledTimes(1);
  });
});
