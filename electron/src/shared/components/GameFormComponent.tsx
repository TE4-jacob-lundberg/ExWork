import React from 'react';
import { useFormik } from 'formik';
import Styled from '@emotion/styled';
import { css } from '@emotion/core';

import { IGameFormFields } from '../helpers/Types';
import ButtonComponent from '../components/ButtonComponent';

const ContainerStyled = Styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #333;
  height: 100%;
  width: 100%;
  position: relative;
  
  & > form {
    height: 100%;
    padding: 12px;
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

const InputLabelStyled = Styled.label`
`;

const InputStyled = Styled.input`
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
  height: 96%;
  border: solid 1px #555;
  background: url(${(props): string => props.image}) ${(props): string => `${props.x}% ${props.y}%`} no-repeat;
  background-size: cover;
`;

interface Props {
  initialValues?: IGameFormFields;
  onSubmit: (values: IGameFormFields) => void;
}

const GameFormComponent: React.FC<Props> = function (props: Props) {
  const formik = useFormik({
    initialValues: {id: '', title: '', abbreviation: '', image: '', xAxis: '50', yAxis: '0', links: [], fileNames: []},
    onSubmit: (values): void => props.onSubmit(values),
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      formik.setValues({...formik.values, image: reader.result as string });
    });

    reader.readAsDataURL(e.target.files![0]);
  }

  return (
    <ContainerStyled>
      <form onSubmit={formik.handleSubmit}>
        <SectionHeaderStyled>Game Information</SectionHeaderStyled>
        <SectionStyled>
          <InputLabelStyled>ID</InputLabelStyled>
          <InputStyled type="text" placeholder="Unique game id" {...formik.getFieldProps('id')} data-testid="game-id" />
          <InputLabelStyled>Title</InputLabelStyled>
          <InputStyled type="text" placeholder="Game Title" {...formik.getFieldProps('title')} data-testid="game-title" />          <InputLabelStyled>Abbreviation</InputLabelStyled>
          <InputStyled type="text" placeholder="Game Abbreviation" {...formik.getFieldProps('abbreviation')} data-testid="game-abbr"/>
        </SectionStyled>
        <SectionHeaderStyled>Image Settings</SectionHeaderStyled>
        <SectionStyled>
          <InputLabelStyled>Image</InputLabelStyled>
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

        <ButtonComponent 
          type="submit"
          background="#555"
          styling={css`
            position: absolute;
            bottom: 12px;
            left: 12px;
            font-size: 1.5rem;
            
            & > i {
              margin-left: 8px;
            }
          `}
          data-testid="submit-form"
        >
          Save
          <i className="material-icons">
            save
          </i>
        </ButtonComponent>
      </form>
      <ImageStyled 
        image={formik.values.image} 
        x={formik.values.xAxis}
        y={formik.values.yAxis}
      />
    </ContainerStyled>
  );
};

export default GameFormComponent;
