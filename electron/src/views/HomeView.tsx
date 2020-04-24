import React from 'react';
import Styled from '@emotion/styled';

interface Props {}

const HomeView: React.FC<Props> = function () {

  const StyledContainer = Styled.div``;

  return (
    <StyledContainer className="HomeView">
      <h1>Hello, World!</h1>
    </StyledContainer>
  );
};

export default HomeView;
