/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';

import { Input, Popup } from '@app/uikit';

import { useStore } from 'effector-react';
import { isNil } from '@app/core/utils';
import { ButtonCancel, ButtonOk } from '@pages/main/styles';
import { $error, deleteWalletFx, onInput } from './model';

interface RemovePopupProps {
  visible?: boolean;
  onCancel?: React.MouseEventHandler;
}

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
      title="DELETE your wallet"
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
          Are you sure you want to remove your wallet?<br />
          You are going to delete your current wallet. Before deleting make sure that you have saved the seed phrase for this wallet if you need it later.<br /><br />
          Please confirm the deleting of this wallet.

        </>
      ) }
    </Popup>
  );
};

export default RemovePopup;
