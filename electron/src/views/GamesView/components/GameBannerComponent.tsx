import React, { useState } from 'react';
import Styled from '@emotion/styled';

import { IGame } from '../../../shared/constants/standardGames';

interface Props {
  game: IGame;
}

const GameBannerComponent: React.FC<Props> = function (props: Props) {
  const [grayScale, setGrayScale] = useState('50');

  function handleClick(): void {
    // Implement click functionality
  }

  function handleMouseEnter(): void {
    setGrayScale('0');
  }

  function handleMouseLeave(): void {
    setGrayScale('50');
  }

  const ContainerStyled = Styled.div`
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
  `;

  const BackgroundStyled = Styled.img`
    position: absolute;
    filter: grayscale(${grayScale}%);
    height: 100%;
    z-index: -1;
  `;

  return (
    <ContainerStyled onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} >
      <BackgroundStyled src={require(`../../../shared/assets/images/${props.game.image.name}`)} />
    </ContainerStyled>
  );
};

export default GameBannerComponent;
