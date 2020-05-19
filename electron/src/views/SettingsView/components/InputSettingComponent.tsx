import React, { useState } from 'react';
import Styled from '@emotion/styled';
import { useIndexedDB } from 'react-indexed-db';

import { IKeybind } from '../../../shared/helpers/Types';
import ModalComponent from '../../../shared/components/ModalComponent';
import { EventBus } from '../../../shared/helpers/EventBus';

const InputStyled = Styled.input`
  text-align: center;
  color: #FFF;
  background: none;
  font-size: 1.5rem;
  width: 160px;
  height: 40px;

  &:focus {
    outline: none;
  }
`;

interface Props {
  config: IKeybind;
}

const InputSettingComponent: React.FC<Props> = function (props: Props) {
  const [changeKey, setChangeKey] = useState(false);
  const keybindDB = useIndexedDB('keybinds');

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    e.currentTarget.blur();
    const key = e.key;
    keybindDB.update({
      ...props.config,
      key,
    }).then(() => {
      EventBus.dispatch('new-keybinds');
    }).catch((err) => console.error(err));
  }

  return (
    <div>
      <InputStyled 
        value={props.config.key}
        onFocus={(): void => setChangeKey(true)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => handleKeyDown(e)}
        onBlur={(): void => setChangeKey(false)}
        readOnly
      />
      {changeKey && <ModalComponent
        title="Press any key"
        onClose={(): void => setChangeKey(false)}
        noActions
      />}
    </div>
  );
};

export default InputSettingComponent;
