/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';

import {
  Button,
  Input,
  Popup,
} from '@app/uikit';

import {
  CancelIcon,
  ArrowRightIcon,
  RemoveIcon,
} from '@app/icons';

import { useStore } from 'effector-react';
import { isNil } from '@app/core/utils';
import { styled } from '@linaria/react';
import {
  $error, deleteWalletFx, onInput, resetError,
} from './model';

interface RemovePopupProps {
  visible?: boolean;
  onCancel?: React.MouseEventHandler;
}

const ButtonCancel = styled.button`
  background-image: url('/assets/settings/delete/cancel_btn_default.png');
  background-repeat: no-repeat;
  background-position-x: center;
  width: 129px;
  height: 36px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  
  &:hover {
    border: 0;
    background-image: url('/assets/settings/delete/cancel_btn_hover.png');
  }
`;

const ButtonOk = styled.button`
  background-image: url('/assets/settings/delete/ok_btn_default.png');
  background-repeat: no-repeat;
  background-position-x: center;
  width: 129px;
  height: 36px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  
  &:hover {
    border: 0;
    background-image: url('/assets/settings/delete/ok_btn_hover.png');
  }
`;

const RemovePopup: React.FC<RemovePopupProps> = ({
  visible,
  onCancel,
}) => {
  const inputRef = useRef<HTMLInputElement>();
  const [warned, setWarned] = useState(false);
  const error = useStore($error);

  const handleConfirm: React.MouseEventHandler = () => {
    if (warned) {
      const { value } = inputRef.current;
      deleteWalletFx(value);
    } else {
      setWarned(true);
    }
  };

  return (
    <Popup
      visible={visible}
      title="Remove current wallet"
      cancelButton={
        <ButtonCancel onClick={onCancel} />
      }
      useCancelButton
      confirmButton={<ButtonOk onClick={handleConfirm} />}
      onCancel={onCancel}
    >
      { warned ? (
        <Input
          label={isNil(error) ? 'Password' : error}
          type="password"
          ref={inputRef}
          valid={isNil(error)}
          onInput={onInput}
        />
      ) : (
        <>
          All data will be erased.
          Make sure you’ve saved your seed phrase if you want to restore this wallet later on!
          <br />
          Are you sure you want to remove your wallet?
        </>
      ) }
    </Popup>
  );
};

export default RemovePopup;
