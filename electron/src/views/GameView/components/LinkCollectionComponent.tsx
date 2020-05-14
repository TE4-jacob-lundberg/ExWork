import React from 'react';
import Styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import { ILink } from '../../../shared/helpers/Types';
import LinkComponent from '../../../shared/components/LinkComponent';

interface Props {
  links: ILink[];
}

const loadedKeyframes = keyframes`
  0% { max-height: 0%; }
`;

const ContainerStyled = Styled.div`
  background: #444;
  width: 200px;
  max-height: calc(100% - 50px);
  animation: ${loadedKeyframes} 1.5s ease-out;
  overflow: hidden;
  opacity: 0.8;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LinkCollectionComponent: React.FC<Props> = function (props: Props) {
  return (
    <ContainerStyled>
      {props.links.map((link, i) => 
        <LinkComponent
          key={i}
          link={link}
          background={i % 2 ? '#777' : '#444'}
        />
      )}
    </ContainerStyled>
  );
};

export default LinkCollectionComponent;
