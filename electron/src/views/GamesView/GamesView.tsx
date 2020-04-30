import React from 'react';
import Styled from '@emotion/styled';

import GameBannerComponent from './components/GameBannerComponent';
import { standardGames } from '../../shared/constants/standardGames';

interface Props {}

const GamesView: React.FC<Props> = function () {
  const StyledContainer = Styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 4px;
  `;

  return (
    <StyledContainer>
      {standardGames.map(game => 
        <GameBannerComponent 
          game={game}
          key={game.title}
        />
      )}
    </StyledContainer>
  );
};

export default GamesView;
