import React, { useState, useEffect, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import Styled from '@emotion/styled';
import { useIndexedDB } from 'react-indexed-db';
import { css } from '@emotion/core';
import { Formik, Field, Form } from 'formik';

import LinkCollectionComponent from './components/LinkCollectionComponent';
import PageTitleComponent from '../../shared/components/PageTitleComponent';
import { IGame, ILink } from '../../shared/helpers/Types';
import ButtonComponent from '../../shared/components/ButtonComponent';
import ModalComponent from '../../shared/components/ModalComponent';

const ContainerStyled = Styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

interface Props {}

interface Params {
  gameID: string;
}

interface IModalContent {
  id: string;
  title: string;
  content: ReactNode;
}

interface IFormValues {
  url?: string;
  label?: string;
  name?: string;
}

const GameView: React.FC<Props> = function () {
  const params = useParams<Params>();
  const [gameData, setGameData] = useState<IGame>();
  const [modalContent, setModalContent] = useState<IModalContent>();
  const db = useIndexedDB('games');

  useEffect(() => {
    if (gameData) return;
    db.getByID(params.gameID).then(resp => setGameData(resp));
  }, [db, params.gameID, gameData]);

  const BackgroundStyled = Styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: grayscale(50%);
    background: url(${gameData && gameData.image!.url }) 50% ${gameData ? gameData.image!.bannerPos.y : '0'} no-repeat;
    background-size: cover;
  `;

  function handleLinkSubmit(rawValues: IFormValues): void {
    if (!gameData) return;
    const newValues: ILink = Object.assign(rawValues);
    if (!rawValues.url?.match(/$(https:\/\/|http:\/\/)/)) newValues.url = `https://${rawValues.url}`;

    const updatedData = {
      ...gameData,
      links: [
        ...gameData?.links,
        newValues,
      ],
    };
    db.update(updatedData)
      .then(() => {
        setModalContent(undefined);
        setGameData(updatedData);
      })
      .catch(err => console.error(err)); 
  }

  const ActionContainerStyled = Styled.section`
    width: 200px;
    height: 50px;
    background: #222;
    margin-top: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
  `;

  const ButtonStyled = css`
    width: 100%;
    height: 100%;
    border-radius: 0;
  `;

  const FormStyling = Styled.span`
    & + form {
      width: 50%;
      height: 300px;
      display: flex;
      margin: auto;
      flex-direction: column;

      & > input {
        margin-bottom: 12px;

        &:focus {
          outline: none;
        }
      }
    }
  `;

  const LabelStyled = Styled.label`
    font-size: 1rem;
  `;

  const FormButton = (
    <ButtonComponent
      type="submit"
      onClick={(): string => ''}
      background="green"
      styling={css`
        font-size: 1.5rem;
        margin: auto;
      `}
    >
      Save
    </ButtonComponent>
  );

  return (
    <>
      <ContainerStyled>
        {gameData && (
          <>
            <PageTitleComponent title={gameData.title} />
            <BackgroundStyled />
            <LinkCollectionComponent links={gameData.links} />
            <ActionContainerStyled>
              <ButtonComponent
                onClick={(): void => setModalContent({id: 'link', title: 'Add link', content: (
                  <Formik
                    initialValues={{url: '', label: ''}}
                    onSubmit={(values: IFormValues): void => handleLinkSubmit(values)}
                  >
                    <Form>
                      <LabelStyled htmlFor="url">URL</LabelStyled>
                      <Field name="url" id="url" />

                      <LabelStyled htmlFor="label">Label</LabelStyled>
                      <Field name="label" id="label" />
                      {FormButton}
                    </Form>
                  </Formik>
                )})}
                styling={ButtonStyled}
                data-testid="add-link"
              >
                <i className="material-icons">
                  add
                </i>
              </ButtonComponent>
              <ButtonComponent
                onClick={(): void => setModalContent({id: 'folder', title: 'Create folder', content: (
                  <Formik
                    initialValues={{name: ''}}
                    onSubmit={(values): void => handleLinkSubmit(values)}
                  >
                    <Form>
                      <LabelStyled htmlFor="name">name</LabelStyled>
                      <Field name="name" />
                      {FormButton}
                    </Form>
                  </Formik>
                )})}
                styling={ButtonStyled}
                disabled
              >
                <i className="material-icons">
                  create_new_folder
                </i>
              </ButtonComponent>
            </ActionContainerStyled>
          </>
        )}
      </ContainerStyled>
      {modalContent && (
        <ModalComponent
          title={modalContent.title}
          onClose={(): void => setModalContent(undefined)}
          noActions
        >
          <FormStyling />
          {modalContent.content}
        </ModalComponent>
      )}
    </>
  );
};

export default GameView;
