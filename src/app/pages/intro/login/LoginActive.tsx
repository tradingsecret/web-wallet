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
  position: absolute;
  top: 320px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputLabel = styled.div`
  font-family: "agency",serif;
  font-weight: normal;
  font-size: 22px;
  letter-spacing: 2px;
  color: #5fe795;
  text-transform: uppercase;
`;

const InputWrapper = styled.div`
  width: 250px;
  margin: 0 auto 20px;
`;

const ButtonLogin = styled.button`
  margin-top: 10px;
  background-image: url('/assets/login/login_default.png');
  background-repeat: no-repeat;
  background-position-x: center;
  width: 342px;
  height: 45px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  
  &:hover {
    border: 0;
    background-image: url('/assets/login/login_hover.png');
  }
`;

const ButtonLink = styled(Button)`
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
            <InputLabel>Password</InputLabel>
            <Input
              autoFocus
              name="password"
              type="password"
              margin="large"
              disabled={pending}
              valid={isNil(error)}
              label={error}
              ref={inputRef}
            />
          </InputWrapper>
          <ButtonLogin type="submit" disabled={pending} />
          <ButtonLink
            variant="link"
            disabled={pending}
            onClick={(event) => {
              event.preventDefault();
              toggleWarning(true);
            }}
          >
            Restore wallet or create a new one
          </ButtonLink>
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
