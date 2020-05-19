import React, { useEffect, useState, useCallback } from 'react';
import Styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useIndexedDB } from 'react-indexed-db';

import { EventBus } from '../../shared/helpers/EventBus';
import ButtonComponent from '../../shared/components/ButtonComponent';
import PageTitleComponent from '../../shared/components/PageTitleComponent';
import InputSettingComponent from './components/InputSettingComponent';
import { IKeybind } from '../../shared/helpers/Types';

const ContainerStyled = Styled.div`
  height: 100%;
  width: 100%;
`;

const SettingContainer = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  width: 100%;
`;

const LabelStyled = Styled.h1`
  font-size: 1rem;
  margin: 8px;
`;

const SettingSectionStyling = css`
  width: 75%;
  margin: 32px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
`;

const GeneralContainerStyled = Styled.div`
  ${SettingSectionStyling.styles}
  border: 4px solid #555;
  background: #333;
`;

const DangerContainerStyled = Styled.div`
  ${SettingSectionStyling.styles}
  border: 4px solid red;
  background: #d43939;

  & label {
    text-transform: uppercase;
  }
`;  

interface Props {}

const SettingsView: React.FC<Props> = function () {
  const [keybinds, setKeybinds] = useState<IKeybind[]>();
  const gameDB = useIndexedDB('games');
  const keybindDB = useIndexedDB('keybinds');
  
  const getInputs = useCallback((): void => {
    keybindDB.getAll().then((resp: IKeybind[]) => setKeybinds(resp));
  }, [keybindDB]);
  
  useEffect(() => {
    if (keybinds) return;
    getInputs();
  }, [keybinds, getInputs]);

  useEffect(() => EventBus.subscribe('new-keybinds-set', getInputs), [getInputs]);

  return (
    <>
      <PageTitleComponent title="Settings" />
      <ContainerStyled>
        <GeneralContainerStyled>
          {keybinds && keybinds.map(keybind => (
            <SettingContainer key={keybind.name}>
              <LabelStyled>{keybind.name}</LabelStyled>
              <InputSettingComponent config={keybind} />
            </SettingContainer>
          ))}
        </GeneralContainerStyled>
        <DangerContainerStyled>
          <SettingContainer>
            <LabelStyled>Reset keybinds to default</LabelStyled>
            <ButtonComponent
              background="red"
              onClick={(): Promise<void> => keybindDB.clear().then(() => EventBus.dispatch('new-keybinds'))}
              confirm
            >
              RESET KEYBINDS
            </ButtonComponent>
          </SettingContainer>
          <SettingContainer>
            <LabelStyled>Reset your games to when first opened</LabelStyled>
            <ButtonComponent
              background="red"
              onClick={(): Promise<void> => gameDB.clear().then(() => EventBus.dispatch('add-standard-games'))}
              confirm
            >
              RESET GAMES
            </ButtonComponent>
          </SettingContainer>
        </DangerContainerStyled>
      </ContainerStyled>
    </>
  );
};

export default SettingsView;
