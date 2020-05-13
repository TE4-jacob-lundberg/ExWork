import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { keyframes } from '@emotion/core';
import Styled from '@emotion/styled';

import { IGame, IPosition } from '../../../shared/helpers/Types';
import { routes } from '../../../shared/constants/routes';

type ImageProps = {
  url: string;
  bannerPos: IPosition;
  doTransition: boolean;
  position: number;
}

interface Props {
  game: IGame;
  position: number;
}

const GameBannerComponent: React.FC<Props> = function (props: Props) {
  const [clicked, setClicked] = useState(false);
  const history = useHistory();

  const clickKeyframes = keyframes`
    0% {width: calc(70vw / 3); left: calc(${props.position} * calc(70vw / 3));
`;

  const ImageStyled = Styled.div<ImageProps>`
    width: ${(props): string => props.doTransition ? '70vw' : 'calc(70vw / 3)'};
    height: 100%;
    background: url(${(props): string => `${props.url}) ${props.bannerPos.x || '0'}% ${props.bannerPos.y || '0'}`}% no-repeat;
    background-size: cover;
    filter: grayscale(50%);
    animation: ${clickKeyframes} 0.5s;
    left: 0;
      
    &:hover { 
      filter: grayscale(0%);
    }

    ${(props): string => props.doTransition ? `
      position: absolute;
      z-index: 999;
    ` : ''}
  `;

  return (
    <div 
      onAnimationEnd={(): void => clicked ? history.push(routes.gameLinks.replace(':gameID', props.game.id)): undefined}
      onClick={(): void => setClicked(true)}
      data-testid="banner"
    >
      <ImageStyled 
        url={props.game.image!.url}
        bannerPos={props.game.image!.bannerPos}
        doTransition={clicked}
        position={props.position}
      />
    </div>
  );
};

export default GameBannerComponent;
