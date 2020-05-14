import React from 'react';

import { ILink } from '../helpers/Types';
import { electron } from '../helpers/BrowserElectron';
import ButtonComponent from '../components/ButtonComponent';
import { css } from '@emotion/core';

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

  return (
    <ButtonComponent 
      onClick={handleClick}
      background={props.background}
      styling={css`
        width: 100%;
        border-radius: 0;
        font-size: 1.25rem;
        padding: 12px 0;

        &:hover {
          color: #000;
          background: #FFF!important;
        }
      `}
    >
      {props.link.label}
    </ButtonComponent>  
  );
};

export default LinkComponent;
