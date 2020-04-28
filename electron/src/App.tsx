import React from 'react';
import Styled from '@emotion/styled';

import AppRouter from './AppRouter';
import './App.css';

interface Props {}

const App: React.FC<Props> = function () {
  const AppContainerStyled = Styled.div`
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background: rgba(0,0,0,0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <AppContainerStyled>
      <AppRouter />
    </AppContainerStyled>
  );
};

export default App;
