import React from 'react';
import { factory } from '../../../shared/helpers/TestFactory';
import GameBackgroundComponent from '../components/GameBackgroundComponent';

const testComponent = <GameBackgroundComponent 
  game={{
    id: 'g1',
    title: 'Game 1',
    abbreviation: 'G1',
    image: {
      name: 'csgo.jpg',
      headerPos: {
        x: '40%',
        y: '25%',
      },
      bannerPos: {
        x: '40%',
        y: '25%',
      },
    },
  }}
/>;

describe('GameBackgroundComponent.tsx', () => {
  it('renders correctly', () => {
    const { container } = factory(testComponent);

    expect(container).toMatchSnapshot();
  });
});
