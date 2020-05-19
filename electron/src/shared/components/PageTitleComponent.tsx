import React from 'react';
import Styled from '@emotion/styled';

interface Props {
  title: string;
}

const PageTitleComponent: React.FC<Props> = function (props: Props) {

  const ContainerStyled = Styled.div`
    position: absolute;
    top: -60px;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    z-index: 9;
  `;
    
  const TitleStyled = Styled.h1`
    border-radius: 15px;
    padding: 8px 24px;
    font-size: 32px;
    background: #333;
  `;

  return (
    <ContainerStyled data-testid="page-title">
      <TitleStyled>{props.title}</TitleStyled>
    </ContainerStyled>
  );
};

export default PageTitleComponent;
