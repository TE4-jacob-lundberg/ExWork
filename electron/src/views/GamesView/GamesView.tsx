import React, { useState, useEffect, useCallback } from 'react';
import Styled from '@emotion/styled';
import { IpcRendererEvent } from 'electron';
import { Window } from 'node-window-manager';
import { useHistory } from 'react-router-dom';

import { electron } from '../../shared/helpers/BrowserElectron';
import { standardGames, IGame } from '../../shared/constants/standardGames';
import GameBannerComponent from './components/GameBannerComponent';
import ModalComponent from '../../shared/components/ModalComponent';

const ipcRenderer = electron.ipcRenderer;

interface Props {}

const GamesView: React.FC<Props> = function () {
  const [runningGame, setRunningGame] = useState<IGame>({title: '', id: '', abbreviation: '', links: [], fileNames: []});
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!runningGame.id || localStorage.getItem('alreadyNotifiedOfRunningGame') === 'true') return;
    localStorage.setItem('alreadyNotifiedOfRunningGame', 'true');
    setShowModal(true);
  }, [runningGame]);

  const handleShowingWindows = useCallback((_event: IpcRendererEvent , prevWin: Window): void => {
    if (!prevWin.id) return;

    // eslint-disable-next-line no-useless-escape
    const prevAppFileName = prevWin.path.match(/(?<=\/)[^\/]*\..*$/)![0];
    const identifiedGame = standardGames.find(game => game.fileNames.includes(prevAppFileName));
    if (identifiedGame) setRunningGame(identifiedGame);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ipcRenderer.on('showing-windows', handleShowingWindows);

    return (): void => {
      ipcRenderer.removeListener('showing-windows', handleShowingWindows);
    };
  }, [handleShowingWindows]);

  const StyledContainer = Styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 4px;
  `;

  return (
    <>
      {showModal && <ModalComponent 
        title="Recognized Game"
        body={`I recognized "${runningGame.title}" is running in the background. Do you want to see its links?`}
        onClose={(): void => setShowModal(false)}
        cancelAble
        onCancel={(): void => setShowModal(false)}
        onContinue={(): void => history.push(`/${runningGame.id}`)}
      />}
      <StyledContainer>
        {standardGames.map(game => 
          <GameBannerComponent 
            game={game}
            key={game.title}
          />
        )}
      </StyledContainer>
    </>
  );
};

export default GamesView;
