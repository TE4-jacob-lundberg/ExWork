import React from 'react';

import { factory } from '../../helpers/TestFactory';
import LinkComponent from '../LinkComponent';

jest.mock('../../helpers/BrowserElectron.ts');

const testComponent = <LinkComponent 
  link={{label: 'test', url: 'test.com'}}
/>;

describe('LinkComponent.tsx', () => {
  it('renders as expected', () => {
    const { container } = factory(testComponent);
    
    expect(container).toMatchSnapshot();
  });
});
