import React, { useEffect, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Styled from '@emotion/styled';
import { initDB, useIndexedDB } from 'react-indexed-db';

import { schema } from './shared/constants/DBSchema';
import AppRouter from './AppRouter';
import './App.css';
import { standardGames } from './shared/constants/standardGames';
import { defaultKeybinds } from './shared/constants/defaultKeybinds';
import { EventBus } from './shared/helpers/EventBus';
import { electron } from './shared/helpers/BrowserElectron';
import { IKeybind, IKeybinds } from './shared/helpers/Types';

initDB(schema);

const ipcRenderer = electron.ipcRenderer;

function aTOh(arr: IKeybind[]): IKeybinds {
  return arr.reduce<IKeybinds>((acc, item) => {
    acc[item.name] = item;
    return acc;
  }, {});
}

interface Props {}

const App: React.FC<Props> = function () {
  const gameDB = useIndexedDB('games');
  const keybindDB = useIndexedDB('keybinds');

  // Add standard games into db
  const addStandardGames = useCallback(() => {
    gameDB.getAll().then(resp => {
      if (!resp.length) standardGames.forEach(game => {
        const noID = Object.assign(game);
        delete noID.id;
        gameDB.add(noID).catch(err => console.error(err));
      });
    });
  }, [gameDB]);

  // Add default/custom keybinds into db
  const setKeyBinds = useCallback((): void => {
    keybindDB.getAll().then((resp: IKeybind[]) => {
      return new Promise((resolve) => {
        if (!resp.length) defaultKeybinds.forEach(keybind => {
          const noID = Object.assign(keybind);
          delete noID.id;
          keybindDB.add(noID).catch(err => console.error(err));
        });
        resolve();
      });
    }).then(() => {
      keybindDB.getAll().then((resp: IKeybind[]) => ipcRenderer.invoke('keybinds-changed', aTOh(resp)));
      EventBus.dispatch('new-keybinds-set');
    }).catch((err: ErrorEvent) => console.error(err));
  }, [keybindDB]);

  useEffect(() => {
    // Control game notification availability
    localStorage.setItem('alreadyNotifiedOfRunningGame', '-1');

    // Add games on load
    addStandardGames();
    EventBus.subscribe('add-standard-games', addStandardGames);

    // Add keybinds on load
    setKeyBinds();
    EventBus.subscribe('new-keybinds', setKeyBinds);
  }, [addStandardGames, setKeyBinds]);

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
