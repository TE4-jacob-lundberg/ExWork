import React, { ReactNode, useState } from 'react';
import Styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/core';
import ModalComponent from './ModalComponent';

interface Props {
  children: ReactNode;
  onClick: () => void;
  styling?: SerializedStyles;
  iconSize?: string;
  background?: string;
  disabled?: boolean;
  title?: string;
  type?: 'button' | 'reset' | 'submit' | undefined;
  confirm?: boolean;
  'data-testid'?: string;
}

const ButtonComponent: React.FC<Props> = function (props: Props) {
  const [showPrompt, setShowPrompt] = useState(false);

  function handleClick(): void {
    props.confirm ? setShowPrompt(true) : props.onClick();
  }

  const ButtonStyled = Styled.button`
    border: none;
    background: ${props.background || '#333'};
    color: #FFF;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    border-radius: 5px;
    width: fit-content;
    font-size: 1.25rem;
    cursor: pointer;
    ${props.disabled && 'filter: brightness(50%);'}

    ${props.disabled || `&:hover {
      background: #666;
    }`}

    &:active {
      outline: none;
    }

    &:focus {
      outline: none;
    }

    & i {
      font-size: ${props.iconSize};
      user-select: none;
    }

    ${props.styling && props.styling.styles}
  `;
  

  return (
    <>
      <ButtonStyled 
        type={props.type}
        onClick={handleClick} 
        disabled={props.disabled} 
        title={props.title}
        data-testid={props['data-testid']}
      >
        {props.children}
      </ButtonStyled>
      {showPrompt && <ModalComponent
        title="Are you sure?"
        onClose={(): void => setShowPrompt(false)}
        onContinue={(): void => {props.onClick(); setShowPrompt(false); }}
        cancelAble
      >
        
      </ModalComponent>}
    </>
  );
};

export default ButtonComponent;
