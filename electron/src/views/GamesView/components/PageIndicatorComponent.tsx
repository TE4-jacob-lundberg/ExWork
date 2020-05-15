import React from 'react';
import Styled from '@emotion/styled';

type ContainerProps = {
  amount: number;
}

const ContainerStyled = Styled.div<ContainerProps>`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(${(props): string => props.amount.toString()}, 1fr);
  bottom: -36px;
`;

type IndicatorProps = {
  active: boolean;
}

const IndicatorStyled = Styled.div<IndicatorProps>`
  height: 16px;
  width: 16px;
  border-radius: 999px;
  background: ${(props): string => props.active ? '#222' : '#666'};
  margin: 8px;
`;

interface Props {
  totalPages: number;
  currentPage: number;
  onSelect: (pageNumber: number) => void;
}

const PageIndicatorComponent: React.FC<Props> = function (props: Props) {
  return (
    <ContainerStyled amount={props.totalPages}>
      {Array(props.totalPages).fill(null).map((val, index) => 
        <IndicatorStyled 
          key={index} 
          active={props.currentPage === index} 
          onClick={(): void => props.onSelect(index)}
          data-testid="indicator"
        />
      )}
    </ContainerStyled>
  );
};

export default PageIndicatorComponent;
