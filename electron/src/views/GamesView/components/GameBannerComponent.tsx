import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { keyframes, css } from '@emotion/core';
import Styled from '@emotion/styled';

import { IGame, IPosition } from '../../../shared/helpers/Types';
import { routes } from '../../../shared/constants/routes';
import ButtonComponent from '../../../shared/components/ButtonComponent';

type ImageProps = {
  url: string;
  bannerPos: IPosition;
  doTransition: boolean;
  position: number;
}

const ContainerStyled = Styled.div`
  & > div {
    filter: grayscale(50%);
  }

  &:hover > div { 
    filter: grayscale(0%);
  }
`;

interface Props {
  game: IGame;
  position: number;
}

const GameBannerComponent: React.FC<Props> = function (props: Props) {
  const [clicked, setClicked] = useState(false);
  const [hover, setHover] = useState(false);
  const history = useHistory();

  const clickKeyframes = keyframes`
    0% {width: calc(70vw / 3); left: calc(${props.position} * calc(70vw / 3));
`;

  const ImageStyled = Styled.div<ImageProps>`
    width: ${(props): string => props.doTransition ? '70vw' : 'calc(70vw / 3)'};
    height: 100%;
    background: url(${(props): string => `${props.url}) ${props.bannerPos.x || '0'}% ${props.bannerPos.y || '0'}`}% no-repeat;
    background-size: cover;
    animation: ${clickKeyframes} 0.5s;
    left: 0;

    & i {
      user-select: none;
    }

    ${(props): string => props.doTransition ? `
      position: absolute;
      z-index: 999;
    ` : ''}
  `;

  return (
    <ContainerStyled 
      onAnimationEnd={(): void => clicked ? history.push(routes.showGame.replace(':gameID', props.game.id)): undefined}
      onMouseOver={(): void => setHover(true)}
      onMouseLeave={(): void => setHover(false)}
      data-testid="banner"
    >
      <ImageStyled 
        onClick={(): void => setClicked(true)}
        url={props.game.image!.url}
        bannerPos={props.game.image!.bannerPos}
        doTransition={clicked}
        position={props.position}
      >
        {hover && <ButtonComponent 
          onClick={(): void => history.push(routes.editGame.replace(':gameID', props.game.id))}
          background="none"
          iconSize="20px"
          styling={css`
            position: absolute;
            top: 4px;
            right: 4px;
            border-radius: 999px;
            z-index: 999;
          `}
        >
          <i className="material-icons">
            edit
          </i>
        </ButtonComponent>}
      </ImageStyled>
    </ContainerStyled>
  );
};

export default GameBannerComponent;
