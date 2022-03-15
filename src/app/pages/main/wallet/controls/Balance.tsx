import React from 'react';
import { styled } from '@linaria/react';
import { AssetTotal } from '@app/model/wallet';
import {
  fromGroths,
} from '@app/core/utils';

interface BalanceAsset {
  mainAsset: AssetTotal | undefined
}

const BalanceWrapper = styled.div`
  font-family: "agency",serif;
  font-weight: bold;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BalanceTitle = styled.div`
  color: #7c7a7a;
  font-size: 24px;
`;

const BalanceElement = styled.div`
  color: #fff;
  font-size: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
`;

// eslint-disable-next-line import/prefer-default-export
export const Balance: React.FC<BalanceAsset> = ({ mainAsset }) => {
  const amount = fromGroths(mainAsset ? mainAsset.available : 0);

  return (
    <BalanceWrapper>
      <BalanceTitle>SUMMARY BALANCE</BalanceTitle>
      <BalanceElement>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        <div>{ amount }</div>
        <div>ARC</div>
      </BalanceElement>
    </BalanceWrapper>
  );
};
