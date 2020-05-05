import React from 'react';
import { fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { routerFactory } from '../../helpers/TestFactory';
import GoBackButtonComponent from '../GoBackButtonComponent';

const testComponent = <GoBackButtonComponent />;

describe('GoBackButtonComponent.tsx', () => {
  it('renders correctly', () => {
    const history = createMemoryHistory({initialEntries: ['/test']});
    const { container } = routerFactory(testComponent, {history});
    
    expect(container).toMatchSnapshot();
  });

  it('goes back in history on click', () => {
    const history = createMemoryHistory({initialEntries: ['/']});
    history.push('/test');
    const { getByText } = routerFactory(testComponent, {history});

    expect(history.location.pathname).toBe('/test');

    fireEvent.click(getByText('Go back'));

    expect(history.location.pathname).toBe('/');
  });

  it('doesn\'t show on root route', () => {
    const history = createMemoryHistory({initialEntries: ['/test']});
    const { container } = routerFactory(testComponent, {history});

    expect(container).toMatchSnapshot();

    history.push('/');

    expect(container).toMatchSnapshot();
  });
});
