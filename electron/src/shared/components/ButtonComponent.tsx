import React from 'react';
import Styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/core';

interface Props {
  children: any;   // eslint-disable-line @typescript-eslint/no-explicit-any
  onClick?: () => void;
  styling?: SerializedStyles;
  iconSize?: string;
  background?: string;
  disabled?: boolean;
  title?: string;
  type?: 'button' | 'reset' | 'submit' | undefined;
  'data-testid'?: string;
}

const ButtonComponent: React.FC<Props> = function (props: Props) {
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
    ${props.disabled && 'filter: brightness(50%);'}
    ${props.styling && props.styling.styles}

    ${props.disabled || `&:hover {
      box-shadow: 0px 0px 5px 2px rgba(255,255,255,1);
    }`}

    &:active {
      outline: none;
    }

    &:focus {
      outline: none;
    }

    & i {
      font-size: ${props.iconSize};
    }
  `;
  

  return (
    <ButtonStyled 
      type={props.type}
      onClick={props.onClick} 
      disabled={props.disabled} 
      title={props.title}
      data-testid={props['data-testid']}
    >
      {props.children}
    </ButtonStyled>
  );
};

export default ButtonComponent;
