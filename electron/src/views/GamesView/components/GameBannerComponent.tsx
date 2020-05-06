import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Styled from '@emotion/styled';

import { IGame } from '../../../shared/constants/standardGames';

interface Props {
  game: IGame;
}

const GameBannerComponent: React.FC<Props> = function (props: Props) {
  const history = useHistory();

  const [grayScale, setGrayScale] = useState('50');

  function handleMouseEnter(): void {
    setGrayScale('0');
  }

  function handleMouseLeave(): void {
    setGrayScale('50');
  }

  const ContainerStyled = Styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    background: url(${require(`../../../shared/assets/images/${props.game.image!.name}`)}) ${props.game.image!.bannerPos.x || '0'} ${props.game.image!.bannerPos.y || '0'} no-repeat;
    background-size: cover;
    filter: grayscale(${grayScale}%);
  `;

  return (
    <ContainerStyled 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      onClick={(): void => history.push(`/${props.game.id}`)}
      data-testid="banner"
    />
  );
};

export default GameBannerComponent;
