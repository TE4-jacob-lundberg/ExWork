import React, { useState, useEffect, useCallback } from 'react';
import { css, jsx } from '@emotion/core'; // eslint-disable-line @typescript-eslint/no-unused-vars
import Styled from '@emotion/styled';
import { IpcRendererEvent } from 'electron';
import { Window } from 'node-window-manager';
import { useHistory } from 'react-router-dom';

import { electron } from '../../shared/helpers/BrowserElectron';
import { routes } from '../../shared/constants/routes';
import { IGame } from '../../shared/constants/standardGames';
import GameBannerComponent from './components/GameBannerComponent';
import ModalComponent from '../../shared/components/ModalComponent';
import ButtonComponent from '../../shared/components/ButtonComponent';
import { Games } from '../../shared/helpers/Games';

/* @jsx jsx */

const ipcRenderer = electron.ipcRenderer;


const ContainerStyled = Styled.div`
  height: 100vh;
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
  width: 70vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4px;
`;

const buttonStyling = css`
  position: absolute;
  z-index: 999;
`;

interface Props {}

const GamesView: React.FC<Props> = function () {
  const [runningGame, setRunningGame] = useState<IGame>({title: '', id: '', abbreviation: '', links: [], fileNames: []});
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(0);
  const history = useHistory();
  const allGames = Games.all();

  useEffect(() => {
    if (!runningGame.id || localStorage.getItem('alreadyNotifiedOfRunningGame') === 'true') return;
    localStorage.setItem('alreadyNotifiedOfRunningGame', 'true');
    setShowModal(true);
  }, [runningGame]);

  const handleShowingWindows = useCallback((_event: IpcRendererEvent , prevWin: Window): void => {
    if (!prevWin.id) return;

    const prevAppFileName = prevWin.path.match(/(?<=\/)[^/]*\..*$/)![0];
    const identifiedGame = allGames.find(game => game.fileNames.includes(prevAppFileName));
    if (identifiedGame) setRunningGame(identifiedGame);
  }, [allGames]);

  useEffect(() => {
    ipcRenderer.on('showing-windows', handleShowingWindows);

    return (): void => {
      ipcRenderer.removeListener('showing-windows', handleShowingWindows);
    };
  }, [handleShowingWindows]);

  function GameBanners(): JSX.Element[] {
    const acc: JSX.Element[] = [];
    for (let index = 0; index < allGames.length; index += 3){ 
      const last = index + 3 <= allGames.length - 1 ? index + 3 : allGames.length;

      acc.push((
        <GameTrioContainerStyled key={index}>
          {allGames.slice(index, last).map(game => 
            <GameBannerComponent 
              game={game}
              key={game.title}
            />
          )}
        </GameTrioContainerStyled>));
    }
    return acc;
  }

  function handleNextPage(): void {
    setPage(page + 1);
  }

  function handlePrevPage(): void {
    setPage(page - 1);
  }

  return (
    <React.Fragment>
      {showModal && <ModalComponent 
        title="Recognized Game"
        body={`I recognized "${runningGame.title}" is running in the background. Do you want to see its links?`}
        onClose={(): void => setShowModal(false)}
        cancelAble
        onCancel={(): void => setShowModal(false)}
        onContinue={(): void => history.push(routes.gameLinks.replace(':gameID', runningGame.id))}
      />}
      <ButtonComponent
        onClick={handlePrevPage}
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
        <BannerContainerStyled page={page} gameAmount={allGames.length}>
          {GameBanners()}
        </BannerContainerStyled>
      </ContainerStyled>
      <ButtonComponent
        onClick={handleNextPage}
        iconSize="48px"
        disabled={page === Math.ceil(allGames.length / 3) - 1}
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
    </React.Fragment>
  );
};

export default GamesView;
