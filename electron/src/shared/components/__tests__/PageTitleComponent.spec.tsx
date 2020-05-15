import React from 'react';

import { factory } from '../../helpers/TestFactory';
import PageTitleComponent from '../PageTitleComponent';

const testComponent = <PageTitleComponent 
  title="TestPageTitle"
/>;

describe('PageTitleComponent.tsx', () => {
  it('renders correctly', () => {
    const { container, getByText } = factory(testComponent);
    
    expect(getByText('TestPageTitle')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
