import React, { ReactNode } from 'react';
import Styled from '@emotion/styled';
import { css, jsx, keyframes } from '@emotion/core'; // eslint-disable-line @typescript-eslint/no-unused-vars

import ButtonComponent from '../components/ButtonComponent';

/* @jsx jsx */

const containerKeyframes = keyframes`
  0% {top: 100%}
`; 

interface Props {
  title: string;
  children: ReactNode;
  onClose: () => void;
  cancelAble?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
  noActions?: boolean;
  continueLabel?: string; 
  onContinue?: () => void;
}

const ModalComponent: React.FC<Props> = function (props: Props) { 
  const ContainerStyled = Styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #333;
    z-index: 999;
    top: calc(calc(70vh - 500px)/2);
    height: 500px;
    width: 500px;
    padding-bottom: 8px;
    border: solid 1px #444;
    animation: ${containerKeyframes} 0.5s ease-out;
  `;

  const TitleStyled = Styled.h1`
    width: 100%;
    min-height: 100px;
    background: #444;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 8px 32px;
  `;

  const BodyStyled = Styled.div`
    width: 90%;
    margin-top: 16px;
    margin: auto;
  `;

  const ActionsContainerStyled = Styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    flex-direction: ${!props.cancelAble ? 'row-reverse' : 'row'};
    padding: 0 16px;
    align-items: center;
  `;

  return (
    <ContainerStyled>
      <TitleStyled>{props.title}</TitleStyled>
      <i 
        css={css`
          position: absolute;
          top: 8px;
          right: 8px;
        `} 
        className="material-icons"
        data-testid="close-modal"
        onClick={(): void => props.onClose()}
      >
        close
      </i>
      <BodyStyled>{props.children}</BodyStyled>
      {props.noActions ||
        <ActionsContainerStyled>
          {props.cancelAble && <ButtonComponent 
            onClick={(): void => props.onCancel && props.onCancel()}
            data-testid="cancel-modal"
            background="red"
          >
            {props.cancelLabel || 'Cancel'}
          </ButtonComponent>}
          <ButtonComponent 
            onClick={(): void => props.onContinue && props.onContinue()}
            data-testid="continue-modal"
            background="green"
          >
            {props.continueLabel || 'Continue'}
          </ButtonComponent>
        </ActionsContainerStyled>}
    </ContainerStyled>
  );
};

export default ModalComponent;
