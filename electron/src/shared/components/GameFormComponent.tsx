import React, { useState } from 'react';
import { useFormik } from 'formik';
import Styled from '@emotion/styled';
import { css } from '@emotion/core';

import { IGameFormFields, IGameFormErrors } from '../helpers/Types';
import ButtonComponent from '../components/ButtonComponent';
import ModalComponent from '../components/ModalComponent';

const ContainerStyled = Styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  width: 100%;
  position: relative;
  border-radius: 5px;
  
  & > form {
    height: 100%;
    padding: 16px;
    background: #333;
    width: 100%;
  }
`;

const SectionHeaderStyled = Styled.h1`
  width: fit-content;
  margin: 12px 0;
`;

const SectionStyled = Styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  padding-bottom: 20px;
  border-bottom: solid 1px #555;


  & > input {
    width: auto;
  }
`;

type LabelProps = {
  error?: boolean;
}

const InputLabelStyled = Styled.label<LabelProps>`
  color: ${(props): string => props.error ? 'red' : ''};
  display: flex;
  align-items: center;
`;

const InputStyled = Styled.input`
  height: 24px;
  &:focus {
    outline: none;
  }
`;

type RangeProps = {
  value: string;
}

const RangeInputStyled = Styled.input<RangeProps>`
  position: relative;
  width: 100%;
  &::after {
    content: '${(props): string => props.value}';
    position: absolute;
    left: calc(${(props): string => (Number(props.value)).toString()}% - 8px);
    top: -12px;
  } 
`;

type ImageProps = {
  image: string;
  x: string;
  y: string;
}

const ImageStyled = Styled.div<ImageProps>`
  width: 23.33vw;
  margin: auto;
  height: 100%;
  background: url(${(props): string => `${props.image}) ${props.x}% ${props.y}%`} no-repeat;
  background-size: cover;
`;

const ErrorMessageStyled = Styled.li`
  color: red;
  margin: 12px 0;
`;

type ActionsContainerProps = {
  deletable: boolean;
}

const ActionsContainer = Styled.div<ActionsContainerProps>`
  position: absolute;
  bottom: 12px;
  left: 12px;
  display: flex;
  flex-direction: ${(props): string => props.deletable ? 'row' : 'row-reverse'};
  justify-content: space-between;
  width: calc(70vw / 2);
  padding: 0 16px;

  & > button {
    margin: 0 4px;
  }
`;

interface Props {
  initialValues?: IGameFormFields;
  deletable?: boolean;
  onSubmit: (values: IGameFormFields) => void;
  onDelete?: () => void;
}

const GameFormComponent: React.FC<Props> = function (props: Props) {
  const [showModal, setShowModal] = useState(false);
  const formik = useFormik({
    initialValues: props.initialValues || {title: '', abbreviation: '', image: '', xAxis: '50', yAxis: '0', fileNames: [localStorage.getItem('latestGameFile')!]},
    onSubmit: (values): void => {
      props.onSubmit(values);
    },
    validate: (values): IGameFormErrors => {
      const errors: IGameFormErrors = {};

      if (!values.title) errors.title = 'You need to enter a title for the game';
      if (!values.image) errors.image = 'You need to select an image to represent the game';

      if (Object.values(errors).find(Boolean)) setShowModal(true);

      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      formik.setValues({...formik.values, image: reader.result as string });
    });

    reader.readAsDataURL(e.target.files![0]);
  }

  return (
    <>
      <ContainerStyled>
        <form onSubmit={formik.handleSubmit}>
          <SectionHeaderStyled>Game Information</SectionHeaderStyled>
          <SectionStyled>
            <InputLabelStyled htmlFor="title" error={!!formik.errors.title}>Title*</InputLabelStyled>
            <InputStyled type="text" {...formik.getFieldProps('title')} id="title" />          
            <InputLabelStyled htmlFor="abbr">Abbreviation</InputLabelStyled>
            <InputStyled type="text" {...formik.getFieldProps('abbreviation')} id="abbr" />
            <InputLabelStyled>Game files (*.exe, *.app)</InputLabelStyled>
            <InputStyled type="text" {...formik.getFieldProps('fileNames')} />
          </SectionStyled>
          <SectionHeaderStyled>Image Settings</SectionHeaderStyled>
          <SectionStyled>
            <InputLabelStyled error={!!formik.errors.image}>Image*</InputLabelStyled>
            <InputStyled type="file" 
              onChange={handleImageChange} 
            />
            {formik.values.image && (
              <>
                <InputLabelStyled>X-axis</InputLabelStyled>
                <RangeInputStyled type="range" min="0" max="100" {...formik.getFieldProps('xAxis')} />
                <InputLabelStyled>Y-axis</InputLabelStyled>
                <RangeInputStyled type="range" min="0" max="100" {...formik.getFieldProps('yAxis')} />
              </>)}
          </SectionStyled>
          <ActionsContainer deletable={!!props.deletable}>
            {props.deletable && <ButtonComponent
              onClick={(): void => props.onDelete && props.onDelete()}
              background="red"
            >
              Delete 
              <i className="material-icons">delete</i>
            </ButtonComponent>}
            <ButtonComponent 
              onClick={(): string => ''}
              type="submit"
              background="green"
              styling={css`            
              & > i {
                margin-left: 8px;
              }
              `}
              data-testid="submit-form"
            >
              Save
              <i className="material-icons">save</i>
            </ButtonComponent>
          </ActionsContainer>
        </form>
        <ImageStyled 
          image={formik.values.image} 
          x={formik.values.xAxis}
          y={formik.values.yAxis}
        />
      </ContainerStyled>
      {showModal && <ModalComponent
        title="You need to fix these errors to save your game"
        onClose={(): void => setShowModal(false)}
        onContinue={(): void => setShowModal(false)}
      >
        <ul>
          {Object.values(formik.errors).filter(Boolean).map((value, i) => (<ErrorMessageStyled key={i}>{value || ''}</ErrorMessageStyled>))}
        </ul>
      </ModalComponent>}
    </>
  );
};

export default GameFormComponent;
