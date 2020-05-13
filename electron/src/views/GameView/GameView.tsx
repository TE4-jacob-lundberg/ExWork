import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Styled from '@emotion/styled';
import { useIndexedDB } from 'react-indexed-db';

import LinkCollectionComponent from './components/LinkCollectionComponent';
import PageTitleComponent from '../../shared/components/PageTitleComponent';
import { IGame } from '../../shared/helpers/Types';

interface Props {}

interface Params {
  gameID: string;
}

const GameView: React.FC<Props> = function () {
  const params = useParams<Params>();
  const [gameData, setGameData] = useState<IGame>();
  const db = useIndexedDB('games');

  useEffect(() => {
    if (gameData) return;
    db.getByID(params.gameID).then(resp => setGameData(resp));
  }, [db, params.gameID, gameData]);

  const ContainerStyled = Styled.div`
    height: 100%;
    width: 100%;
    position: relative;
  `;

  const BackgroundStyled = Styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    filter: grayscale(50%);
    background: url(${gameData && gameData.image!.url }) 50% ${gameData ? gameData.image!.bannerPos.y : '0'} no-repeat;
    background-size: cover;
  `;

  return (
    <ContainerStyled>
      {gameData && (
        <>
          <PageTitleComponent title={gameData.title} />
          <BackgroundStyled />
          <LinkCollectionComponent links={gameData.links} />
        </>
      )}
    </ContainerStyled>
  );
};

export default GameView;
