import React from 'react';
import Styled from '@emotion/styled';

import { IGame } from '../../../shared/constants/standardGames';

interface Props {
  game: IGame;
}

const GameBackgroundComponent: React.FC<Props> = function (props: Props) {

  const ContainerStyled = Styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url(${require(`../../../shared/assets/images/${props.game.image.name}`)}) ${props.game.image.headerPos.x || '0'} ${props.game.image.headerPos.y || '0'} no-repeat;
    background-size: cover;
  `;

  return (
    <ContainerStyled>
    </ContainerStyled>
  );
};

export default GameBackgroundComponent;
