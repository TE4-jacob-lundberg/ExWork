import React, { useState } from 'react';
import Styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import { ILink } from '../../../shared/helpers/Types';
import LinkComponent from '../../../shared/components/LinkComponent';

interface Props {
  links: ILink[];
}

const loadedKeyframes = keyframes`
  0% { max-height: 0%; }
  100% { max-height: 100%; }
`;

const LinkCollectionComponent: React.FC<Props> = function (props: Props) {
  const [isAnimating, setIsAnimating] = useState(true);

  const ContainerStyled = Styled.div`
    background: #444;
    width: 200px;
    max-height: 100%;
    animation: ${isAnimating ? loadedKeyframes : 'none'} 1s ease-out;
    overflow: ${isAnimating ? 'hidden' : 'auto'};
    display: grid;
    grid-template-columns: 1fr;
    opacity: 0.8;

    &::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <ContainerStyled onAnimationEnd={(): void => setIsAnimating(false)}>
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
