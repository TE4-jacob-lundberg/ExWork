import React, { useState } from 'react';
import { css, keyframes } from '@emotion/core';
import Styled from '@emotion/styled';

import { ILink } from '../helpers/Types';
import { electron } from '../helpers/BrowserElectron';
import { EventBus } from '../helpers/EventBus';
import ButtonComponent from '../components/ButtonComponent';

const ipcRenderer = electron.ipcRenderer;

const DeleteBarKeyframes = keyframes`
  0% { width: 0%; }
`;

const ContainerStyled = Styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  &:hover > button {
    color: #000;
    background: #FFF;
  }

  &:hover > i {
    display: initial;
  }
`;

const DeleteButtonStyled = Styled.i`
  padding: 0;
  position: absolute;
  color: red;
  left: 4px;
  display: flex;
  align-self: center;
  cursor: default;
  user-select: none;
  display: none;

  &:hover {
    border-radius: 999px;
    transform: scale(1.25);
  }
`;

const DeleteBarStyled = Styled.div`
  background: red;
  width: 100%;
  height: 8px;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${DeleteBarKeyframes} 2s;
`;

interface Props {
  link: ILink
  background?: string;
}

const LinkComponent: React.FC<Props> = function (props: Props) {
  const [deleting, setDeleting] = useState(false);

  function handleClick(): void {
    ipcRenderer.invoke('open-link', props.link.url)
      .catch((err: ErrorEvent) => console.error(err));
  }

  return (
    <ContainerStyled>
      {deleting && <DeleteBarStyled 
        onAnimationEnd={(): void => EventBus.dispatch('delete-link', props.link)}
      />}
      <DeleteButtonStyled
        className="material-icons"
        onMouseDown={(): void => setDeleting(true)}
        onMouseUp={(): void => setDeleting(false)}
        onMouseLeave={(): void => setDeleting(false)}
      >
        remove_circle
      </DeleteButtonStyled>
      <ButtonComponent 
        onClick={handleClick}
        background={props.background}
        styling={css`
          width: 100%;
          border-radius: 0;
          padding: 12px 0;
        `}
      >
        {props.link.label}
      </ButtonComponent>  
    </ContainerStyled>
  );
};

export default LinkComponent;
