import React from 'react';
import { fireEvent } from '@testing-library/react';

import { routerFactory } from '../../../shared/helpers/TestFactory';
import GameBannerComponent from '../components/GameBannerComponent';

const testComponent = (<GameBannerComponent
  game={{
    id: 'g1',
    title: 'Game 1',
    abbreviation: 'G1',
    image: {
      name: 'csgo.jpg',
      bannerPos: {
        x: '50%',
        y: '0',
      },
    },
  }}       
/>);


describe('GameBannerComponent.tsx', () => {
  it('renders correctly', () => {
    const container = routerFactory(testComponent);
  
    expect(container).toMatchSnapshot();
  });

  it('redirects to its links on click', () => {
    const { container, getByTestId } = routerFactory(testComponent);

    expect(container).toMatchSnapshot();
    expect(window.location.pathname).toBe('/');
    
    fireEvent.click(getByTestId('banner'));

    setTimeout(() => {
      expect(window.location.pathname).toMatch(/\/g1/);
    }, 1500);
  });
});
