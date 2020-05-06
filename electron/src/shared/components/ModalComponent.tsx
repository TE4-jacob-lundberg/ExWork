import React from 'react';
import Styled from '@emotion/styled';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from '@emotion/core';

/* @jsx jsx */

type ActionProps = {
  background: string;
}

interface Props {
  title: string;
  body: string;
  onClose: () => void;
  cancelAble?: boolean;
  cancelLabel?: string;
  onCancel: () => void;
  continueLabel?: string; 
  onContinue: () => void;
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
    height: 500px;
    width: 500px;
    padding-bottom: 8px;
  `;

  const TitleStyled = Styled.h1`
    width: 100%;
    height: 100px;
    background: #444;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const BodyStyled = Styled.p`
    width: 80%;
    margin-top: 16px;
    text-align: center;
    margin: auto;
    font-size: 1.5rem;
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

  const ActionStyled = Styled.button<ActionProps>`
    height: 80%;
    width: fit-content;
    padding: 0 8px;
    border: none;
    color: #FFF;
    font-size: 1.25rem;
    background: ${(props): string => props.background}
  `;

  return (
    <ContainerStyled className="Modal">
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
      <BodyStyled>{props.body}</BodyStyled>
      <ActionsContainerStyled>
        {props.cancelAble && <ActionStyled 
          onClick={(): void => props.onCancel()}
          data-testid="cancel-modal"
          background="red"
        >
          {props.cancelLabel || 'Cancel'}
        </ActionStyled>}
        <ActionStyled 
          onClick={(): void => props.onContinue()}
          data-testid="continue-modal"
          background="green"
        >
          {props.continueLabel || 'Continue'}
        </ActionStyled>
      </ActionsContainerStyled>
    </ContainerStyled>
  );
};

export default ModalComponent;
