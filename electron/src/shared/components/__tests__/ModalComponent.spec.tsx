import React from 'react';
import { fireEvent } from '@testing-library/react';

import { factory } from '../../helpers/TestFactory';
import ModalComponent from '../ModalComponent';

const mockedClose = jest.fn();
const mockedCancel = jest.fn();
const mockedContinue = jest.fn();

const testComponent = <ModalComponent 
  title="Test"
  cancelAble
  onClose={mockedClose}
  onCancel={mockedCancel}
  onContinue={mockedContinue}
>
  text
</ModalComponent>;

describe('ModalComponent.tsx', () => {
  it('renders correctly', () => {
    const { container, getByText } = factory(testComponent);
    
    expect(getByText('Test'));
    expect(getByText('text'));
    expect(container).toMatchSnapshot();
  });

  it('closes when clicking on x', () => {
    const { getByTestId } = factory(testComponent);

    fireEvent.click(getByTestId('close-modal'));

    expect(mockedClose).toHaveBeenCalledTimes(1);
  });

  it('closes when clicking cancel', () => {
    const { getByTestId } = factory(testComponent);

    fireEvent.click(getByTestId('cancel-modal'));

    expect(mockedCancel).toHaveBeenCalledTimes(1);
  });

  it('proceeds when continue is clicked', () => {
    const { getByTestId } = factory(testComponent);

    fireEvent.click(getByTestId('continue-modal'));

    expect(mockedContinue).toHaveBeenCalledTimes(1);
  });
});
