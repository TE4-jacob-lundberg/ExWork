import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Styled from '@emotion/styled';
import { initDB, useIndexedDB } from 'react-indexed-db';

import { schema } from './shared/constants/DBSchema';
import AppRouter from './AppRouter';
import './App.css';
import { standardGames } from './shared/constants/standardGames';

initDB(schema);

interface Props {}

const App: React.FC<Props> = function () {
  const db = useIndexedDB('games');

  useEffect(() => {
    // Control game notification availability
    localStorage.setItem('alreadyNotifiedOfRunningGame', '-1');

    // Add standard games into db
    db.getAll().then(resp => {
      if (!resp.length) standardGames.forEach(game => {
        const noID = Object.assign(game);
        delete noID.id;
        db.add(noID).catch(err => console.error(err));
      });
    });
  }, [db]);

  const AppContainerStyled = Styled.main`
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
