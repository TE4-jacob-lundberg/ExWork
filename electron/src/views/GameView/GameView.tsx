import React from 'react';
import { useParams } from 'react-router-dom';
import Styled from '@emotion/styled';

import { Games } from '../../shared/helpers/Games';
import GameBackgroundComponent from './components/GameBackgroundComponent';
import LinkCollectionComponent from './components/LinkCollectionComponent';
import PageTitleComponent from '../../shared/components/PageTitleComponent';

interface Props {}

interface Params {
  gameID: string;
}

const GameView: React.FC<Props> = function () {
  const params = useParams<Params>();

  const gameData = Games.all().find(game => game.id === params.gameID)!;

  const ContainerStyled = Styled.div`
    height: 100%;
    width: 100%;
    position: relative;
  `;

  return (
    <ContainerStyled>
      <PageTitleComponent title={gameData.title} />
      <GameBackgroundComponent 
        game={gameData}
      />
      <LinkCollectionComponent 
        links={gameData.links}
      />
    </ContainerStyled>
  );
};

export default GameView;
