import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';

import { setView, View } from '@app/model/view';
import { Popup, Splash } from 'app/uikit';
import { ConfirmButton } from '@uikit/Popup';

import { resetCache, resetErrors } from '@pages/intro/seed/model';

import { styled } from '@linaria/react';
import { $phase, LoginPhase, setLoginPhase } from './model';

const ButtonsWrap = styled.div`
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ButtonCreate = styled.button`
  background-image: url('/assets/buttons/create/default.png');
  background-repeat: no-repeat;
  background-position-x: center;
  width: 342px;
  height: 45px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  
  &:hover {
    border: 0;
    background-image: url('/assets/buttons/create/hover.png');
  }
`;

const ButtonRestore = styled.button`
  background-image: url('/assets/buttons/restore/default.png');
  background-repeat: no-repeat;
  background-position-x: center;
  width: 342px;
  height: 45px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  
  &:hover {
    border: 0;
    background-image: url('/assets/buttons/restore/hover.png');
  }
`;

const LoginRestore: React.FC = () => {
  useEffect(() => {
    resetCache();
    resetErrors();
  }, []);

  const [warningVisible, toggleWarning] = useState(false);
  const phase = useStore($phase);
  const active = phase === LoginPhase.RESTORE;

  const handleReturn = () => {
    setLoginPhase(LoginPhase.ACTIVE);
  };

  return (
    <>
      <Splash
        blur={warningVisible}
        onReturn={active ? handleReturn : null}
      >
        <ButtonsWrap>
          <ButtonCreate
            type="button"
            onClick={() => setView(View.SEED_WARNING)}
          />
          <ButtonRestore
            onClick={() => toggleWarning(true)}
          />
        </ButtonsWrap>
      </Splash>
      <Popup
        visible={warningVisible}
        title="Restore wallet"
        confirmButton={(
          <ConfirmButton onClick={() => setView(View.RESTORE)} />
        )}
        onCancel={() => toggleWarning(false)}
      >
        You are going to restore an existing Imperium Protocol Wallet.
        <br />
        <br />
        IMPORTANT: If you are restoring your wallet on another device then your transaction history and saved addresses won't be restored.
      </Popup>
    </>
  );
};

export default LoginRestore;
