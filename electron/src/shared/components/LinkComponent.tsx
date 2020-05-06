import React from 'react';
import Styled from '@emotion/styled';

import { ILink } from '../helpers/Types';
import { electron } from '../helpers/BrowserElectron';

const ipcRenderer = electron.ipcRenderer;

interface Props {
  link: ILink
  background?: string;
}

const LinkComponent: React.FC<Props> = function (props: Props) {
  function handleClick(): void {
    ipcRenderer.invoke('open-link', props.link.url)
      .catch((err: ErrorEvent) => console.error(err));
  }

  const ContainerStyled = Styled.div`
    min-height: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    background: ${props.background};

    &:hover { 
      background: white;
    }
  `;
  
  const ButtonStyled = Styled.button`
    background: none;
    border: none;
    width: 100%;
    color: #FFF;
    height: 100%;
    font-size: 1.25rem;
    padding: 12px 0;

    &:hover {
      color: #000;
    }
  `;
  
  return (
    <ContainerStyled>
      <ButtonStyled onClick={handleClick}>
        {props.link.label}
      </ButtonStyled>  
    </ContainerStyled>
  );
};

export default LinkComponent;
