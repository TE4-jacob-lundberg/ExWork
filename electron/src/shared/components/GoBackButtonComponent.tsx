import React from 'react';
import { useHistory } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from '@emotion/core';
import Styled from '@emotion/styled';

/* @jsx jsx */

interface Props {}

const GoBackButtonComponent: React.FC<Props> = function () {
  const history = useHistory();

  const ContainerStyled = Styled.div`
    position: absolute;
    z-index: 9999px;
    padding: 8px;
    border-radius: 5px;
    left: 5%;
    top: 5%;
    height: 50px;
    background: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;

    &:hover {
      box-shadow: 0px -1px 5px 2px rgba(255,255,255,1);
    }
  `;

  if (history.location.pathname === '/') return (<span />);

  return (
    <ContainerStyled onClick={(): void => history.goBack()}>
      Go back
      <i 
        className="material-icons"
        css={css`
          color: #FFF;
          font-size: 36px;
        `}
      >
        keyboard_backspace
      </i>
    </ContainerStyled>
  );
};

export default GoBackButtonComponent;
