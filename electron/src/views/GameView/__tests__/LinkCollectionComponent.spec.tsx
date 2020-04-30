import React from 'react';
import { factory } from '../../../shared/helpers/TestFactory';

import LinkCollectionComponent from '../components/LinkCollectionComponent';

const testComponent = <LinkCollectionComponent 
  links={[{url: '', label: 'link1'}, {url: '', label: 'link2'}]}
/>;

describe('LinkCollectionComponent.tsx', () => {
  it('renders correctly', () => {
    const { container } = factory(testComponent);
    
    expect(container).toMatchSnapshot();
  });

  it('displays the links', () => {
    const { getByText } = factory(testComponent);

    expect(getByText('link1')).toBeTruthy();
    expect(getByText('link2')).toBeTruthy();
  });
});
