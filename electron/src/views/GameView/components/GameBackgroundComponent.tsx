import React from 'react';
import Styled from '@emotion/styled';

import { IGame } from '../../../shared/constants/standardGames';

interface Props {
  game: IGame;
}

function isBlob(string: string): boolean {
  return (string.substr(0, 4) === 'data');
}

const GameBackgroundComponent: React.FC<Props> = function (props: Props) {

  const ContainerStyled = Styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url(${isBlob(props.game.image!.name) ? props.game.image!.name : require(`../../../shared/assets/images/${props.game.image!.name}`)}) 50% ${props.game.image!.bannerPos.y || '0'} no-repeat;
    background-size: cover;
  `;

  return (
    <ContainerStyled />
  );
};

export default GameBackgroundComponent;
