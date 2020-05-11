import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Styled from '@emotion/styled';

import AppRouter from './AppRouter';
import './App.css';

interface Props {}

const App: React.FC<Props> = function () {
  useEffect(() => {
    localStorage.setItem('alreadyNotifiedOfRunningGame', 'false');
  }, []);

  const AppContainerStyled = Styled.div`
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <BrowserRouter>
      <AppContainerStyled>
        <AppRouter />
      </AppContainerStyled>
    </BrowserRouter>
  );
};

export default App;
