import React, { useState, useEffect, useCallback } from 'react';
import { css } from '@emotion/core';
import Styled from '@emotion/styled';
import { IpcRendererEvent } from 'electron';
import { Window } from 'node-window-manager';
import { useHistory } from 'react-router-dom';
import { useIndexedDB } from 'react-indexed-db';

import { electron } from '../../shared/helpers/BrowserElectron';
import { routes } from '../../shared/constants/routes';
import { IGame } from '../../shared/helpers/Types';
import GameBannerComponent from './components/GameBannerComponent';
import ModalComponent from '../../shared/components/ModalComponent';
import ButtonComponent from '../../shared/components/ButtonComponent';
import PageIndicatorComponent from './components/PageIndicatorComponent';

const ipcRenderer = electron.ipcRenderer;

const ContainerStyled = Styled.div`
  height: 100%;
  width: 100vw;
  position: relative;
  display: flex;
  align-items: center;
`;

type ContainerProps = {
  page: number;
  gameAmount: number;
}

const BannerContainerStyled = Styled.div<ContainerProps>`
  position: absolute;
  left: ${(props): number => -(86 * props.page)}vw;
  height: 70vh;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(${(props): number => Math.ceil(props.gameAmount / 3)}, 1fr);
  grid-gap: 16vw;
  transition: 0.75s ease-in-out;
`;

const GameTrioContainerStyled = Styled.div`
  position: relative;
  width: 70vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4px;
  padding: -2px 0;
`;

const buttonStyling = css`
  position: absolute;
  z-index: 999;
  bottom: 50%;
`;

interface Props {}

const GamesView: React.FC<Props> = function () {
  const [runningGame, setRunningGame] = useState<IGame>();
  const [showModal, setShowModal] = useState(false);
  const [games, setGames] = useState<IGame[]>([]);
  const [page, setPage] = useState(0);
  const db = useIndexedDB('games');
  const history = useHistory();

  useEffect(() => {
    if (games.length) return;
    db.getAll().then((resp: IGame[]) => {
      setGames(resp);
    }).catch(err => console.error(err));
  }, [db, games]);

  // Check if there is a added game focused when overlay is turned on
  const handleShowingWindows = useCallback((_event: IpcRendererEvent , prevWin: Window): void => {
    if (!prevWin.id) return;

    const prevAppFileName = prevWin.path.match(/(?<=\/)[^/]*\..*$/)![0];
    const identifiedGame = games.find(game => game.fileNames.includes(prevAppFileName));
    if (identifiedGame) { 
      setRunningGame(identifiedGame); 
      localStorage.setItem('latestGameFile', prevAppFileName); 
    }
  }, [games]);

  // Eventlisteners to handle toggling the overlay
  useEffect(() => {
    ipcRenderer.on('showing-windows', handleShowingWindows);

    return (): void => {
      ipcRenderer.removeListener('showing-windows', handleShowingWindows);
    };
  }, [handleShowingWindows]);

  // Toggle state which prevents modal from appearing again
  useEffect(() => {
    if (!runningGame || localStorage.getItem('alreadyNotifiedOfRunningGame') === runningGame.id) return;
    localStorage.setItem('alreadyNotifiedOfRunningGame', runningGame.id);
    setShowModal(true);
  }, [runningGame]);

  function GameBanners(): JSX.Element[] {
    const acc: JSX.Element[] = [];
    for (let index = 0; index < games.length; index += 3){ 
      const last = index + 3 <= games.length - 1 ? index + 3 : games.length;

      acc.push((
        <GameTrioContainerStyled key={index}>
          {games.slice(index, last).map((game, i) => 
            <GameBannerComponent 
              game={game}
              position={i}
              key={game.title}
            />
          )}
        </GameTrioContainerStyled>));
    }
    return acc;
  }

  return (
    <React.Fragment>
      <ButtonComponent
        onClick={(): void => setPage(page - 1)}
        iconSize="48px"
        disabled={page === 0}
        styling={css`
          left: -100px;
          ${buttonStyling.styles}
        `}
      >
        <i className="material-icons">
          chevron_left
        </i>
      </ButtonComponent>
      <ContainerStyled>
        <BannerContainerStyled page={page} gameAmount={games.length}>
          {GameBanners()}
        </BannerContainerStyled>
      </ContainerStyled>
      <PageIndicatorComponent 
        totalPages={Math.ceil(games.length / 3)}
        currentPage={page}
        onSelect={(pageNumber: number): void => setPage(pageNumber)}
      />
      <ButtonComponent
        onClick={(): void => setPage(page + 1)}
        iconSize="48px"
        disabled={page === Math.ceil(games.length / 3) - 1}
        styling={css`
          right: -100px;
          ${buttonStyling.styles}
        `}
      >
        <i className="material-icons">
          chevron_right
        </i>
      </ButtonComponent>
      <ButtonComponent
        onClick={(): void => history.push(routes.addGame)}
        iconSize="48px"
        title="Add your own game"
        styling={css`
          position: absolute;
          right: -100px;
          bottom: 0;
        `}
      >
        <i className="material-icons">
          add
        </i>
      </ButtonComponent>
      {showModal && <ModalComponent 
        title="Recognized Game"
        onClose={(): void => setShowModal(false)}
        cancelAble
        onCancel={(): void => setShowModal(false)}
        onContinue={(): void => history.push(routes.showGame.replace(':gameID', runningGame!.id))}
      >
        <p>I recognize</p>
        <h3>{runningGame && runningGame.title}</h3>
        <p>is running in the background. Do you want to see its links?</p>
      </ModalComponent>}
    </React.Fragment>
  );
};

export default GamesView;
