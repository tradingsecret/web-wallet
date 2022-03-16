import React from 'react';
import { useStore } from 'effector-react';
import { styled } from '@linaria/react';

import { Splash } from 'app/uikit';
import WasmWallet from '@core/WasmWallet';

import {
  $syncPercent, $syncProgress,
} from './model';

const ProgressWrapper = styled.div`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
`;

const ProgressLine = styled.img`
  width: 400px;
  height: 160px;
`;

const wallet = WasmWallet.getInstance();

const Progress = () => {
  const [total] = useStore($syncProgress);
  const syncPercent = useStore($syncPercent);
  const syncPercentRounded = Math.ceil(syncPercent);
  // eslint-disable-next-line no-nested-ternary,@typescript-eslint/no-shadow
  const numberImage = syncPercentRounded < 10 ? `00${syncPercentRounded}` : syncPercentRounded < 100 ? `0${syncPercentRounded}` : syncPercentRounded;

  return (
    <Splash size="small">
      <ProgressWrapper>
        <ProgressLine src={`/assets/progress_bar_sequence/${numberImage}.png`} />
      </ProgressWrapper>
    </Splash>
  );
};

export default Progress;
