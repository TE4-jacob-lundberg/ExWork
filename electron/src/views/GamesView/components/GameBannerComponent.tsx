import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Styled from '@emotion/styled';

import { IGame } from '../../../shared/constants/standardGames';
import { routes } from '../../../shared/constants/routes';

interface Props {
  game: IGame;
}

function isBlob(string: string): boolean {
  return (string.substr(0, 4) === 'data');
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
    background: url(${isBlob(props.game.image!.name) ? props.game.image!.name : require(`../../../shared/assets/images/${props.game.image!.name}`)}) ${props.game.image!.bannerPos.x || '0'}% ${props.game.image!.bannerPos.y || '0'}% no-repeat;
    background-size: cover;
    filter: grayscale(${grayScale}%);
  `;

  return (
    <ContainerStyled 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      onClick={(): void => history.push(routes.gameLinks.replace(':gameID', props.game.id))}
      data-testid="banner"
    />
  );
};

export default GameBannerComponent;
