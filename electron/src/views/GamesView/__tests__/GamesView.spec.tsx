import React from 'react';
import { RenderResult } from '@testing-library/react';
import renderer from 'react-test-renderer';
import GamesView from '../GamesView';

function factory(): RenderResult {
  return renderer.create(<GamesView />);
}

describe('GamesView.tsx', () => {
  it('renders correctly', () => {
    const container = factory();
    
    expect(container).toMatchSnapshot();
  });
});
