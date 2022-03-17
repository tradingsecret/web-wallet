import React, { useState, useRef } from 'react';
import { useStore } from 'effector-react';

import {
  Popup, Button, Input, Splash,
} from '@uikit';

import { ConfirmButton } from '@uikit/Popup';

import { isNil } from '@app/core/utils';

import {
  WalletSmallIcon,
  DoneIcon,
} from '@app/icons';

import { styled } from '@linaria/react';
import {
  $error, startWalletFx, LoginPhase, setLoginPhase,
} from './model';

const FormStyled = styled.form`
  text-align: left;
  width: 250px;
  position: absolute;
  top: 360px;
  left: 50%;
  transform: translateX(-50%);
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const LoginActive: React.FC = () => {
  const [warningVisible, toggleWarning] = useState(false);

  const pending = useStore(startWalletFx.pending);
  const error = useStore($error);

  const inputRef = useRef<HTMLInputElement>();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { value } = inputRef.current;
    startWalletFx(value);
  }

  return (
    <>
      <Splash size="small">
        <FormStyled autoComplete="off" noValidate onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              autoFocus
              name="password"
              type="password"
              placeholder="Password"
              margin="large"
              disabled={pending}
              valid={isNil(error)}
              label={error}
              ref={inputRef}
            />
          </InputWrapper>
          <Button type="submit" disabled={pending} icon={WalletSmallIcon}>
            open your wallet
          </Button>
          <Button
            variant="link"
            disabled={pending}
            onClick={(event) => {
              event.preventDefault();
              toggleWarning(true);
            }}
          >
            Restore wallet or create a new one
          </Button>
        </FormStyled>
      </Splash>
      <Popup
        visible={warningVisible}
        title="Restore wallet or create a new one"
        confirmButton={(
          <ConfirmButton onClick={() => setLoginPhase(LoginPhase.RESTORE)} />
        )}
        onCancel={() => {
          toggleWarning(false);
        }}
      >
        If you&apos;ll restore a wallet all transaction history and addresses will be
        lost
      </Popup>
    </>
  );
};

export default LoginActive;
