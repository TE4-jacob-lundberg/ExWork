import React from 'react';
import Styled from '@emotion/styled';

import { ILink } from '../helpers/Types';

interface Props {
  link: ILink
  background?: string;
}

const LinkComponent: React.FC<Props> = function (props: Props) {
  const ContainerStyled = Styled.div`
    height: 100%;
    width: 100%;
    padding: 16px 0;
    background: ${props.background};

    &:hover { 
      background: white;
    }
  `;
  
  const ButtonStyled = Styled.button`
    background: none;
    border: none;
    width: 100%;
    height: 100%;
  `;
  
  return (
    <ContainerStyled>
      <ButtonStyled>
        {props.link.label}
      </ButtonStyled>  
    </ContainerStyled>
  );
};

export default LinkComponent;
