import React from 'react';
import { RenderResult } from '@testing-library/react';
import renderer from 'react-test-renderer';

import GameBannerComponent from '../components/GameBannerComponent';

function factory(): RenderResult {
  return renderer.create(
    <GameBannerComponent
      game={{
        title: 'Game 1',
        abbreviation: 'G1',
        image: {
          name: 'csgo.jpg',
        },
      }}       
    />
  );
}

describe('GameBannerComponent.tsx', () => {
  it('renders correctly', () => {
    const container = factory();
    
    expect(container).toMatchSnapshot();
  });
});
