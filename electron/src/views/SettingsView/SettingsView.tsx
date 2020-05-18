import React from 'react';
import Styled from '@emotion/styled';
import { useIndexedDB } from 'react-indexed-db';

import { EventBus } from '../../shared/helpers/EventBus';
import ButtonComponent from '../../shared/components/ButtonComponent';
import PageTitleComponent from '../../shared/components/PageTitleComponent';

const ContainerStyled = Styled.div`
  height: 100%;
  width: 100%;
  background: #333;
  padding: 20px;
`;

const SettingContainer = Styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DangerContainerStyled = Styled.div`
  width: 75%;
  margin: auto;
  padding: 20px;
  border: 4px solid red;
  border-radius: 5px;
  background: #d43939;
  display: flex;
  flex-direction: column;
  align-items: center;
`;  

const DangerLabelStyled = Styled.h1`
  font-size: 1rem;
  text-transform: uppercase;
  margin: 8px;
`;

interface Props {}

const SettingsView: React.FC<Props> = function () {
  const db = useIndexedDB('games');

  return (
    <>
      <PageTitleComponent title="Settings" />
      <ContainerStyled>
        <DangerContainerStyled>
          <SettingContainer>
            <DangerLabelStyled>Reset your games to when first opened</DangerLabelStyled>
            <ButtonComponent
              background="red"
              onClick={(): Promise<void> => db.clear().then(() => EventBus.dispatch('add-standard-games', null))}
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
