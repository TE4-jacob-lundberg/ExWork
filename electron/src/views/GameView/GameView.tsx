import React from 'react';
import { useParams } from 'react-router-dom';
import Styled from '@emotion/styled';

import { standardGames } from '../../shared/constants/standardGames';
import GameBackgroundComponent from './components/GameBackgroundComponent';
import LinkCollectionComponent from './components/LinkCollectionComponent';

interface Props {}

interface Params {
  gameID: string;
}

const GameView: React.FC<Props> = function () {
  const params = useParams<Params>();

  const gameData = standardGames.find(game => game.id === params.gameID)!;

  const ContainerStyled = Styled.div`
    height: 100%;
    width: 100%;
    position: relative;
  `;

  return (
    <ContainerStyled>
      <GameBackgroundComponent 
        game={gameData}
      />
      <LinkCollectionComponent 
        links={[{label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }, {label: 'Google', url: 'google.com' }]}
      />
    </ContainerStyled>
  );
};

export default GameView;
