/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { styled } from '@linaria/react';

import { Window } from 'app/uikit';
import { compact, isNil } from '@core/utils';
import { getRateFx, GROTHS_IN_BEAM } from '@app/model/rates';

import { css } from '@linaria/core';
import { $assets, $transactions } from '@app/model/wallet';

import { Transaction, WalletTab } from '@app/core/types';
import { Header } from '@pages/main/wallet/controls/Header';
import { Balance } from '@pages/main/wallet/controls/Balance';
import { Buttons } from '@pages/main/wallet/controls/Buttons';
import { Tabs } from '@pages/main/wallet/controls/Tabs';
import { Funds } from '@pages/main/wallet/controls/Funds';
import Transactions from './controls/Transactions';

const TXS_MAX = 4;

const TABLE_CONFIG = [
  {
    name: 'create_time',
    title: 'Created',
  },
  {
    name: 'sender',
    title: 'From',
    fn: compact,
  },
  {
    name: 'receiver',
    title: 'To',
    fn: compact,
  },
  {
    name: 'value',
    title: 'Amount',
    fn: (value: number) => {
      const result = value / GROTHS_IN_BEAM;
      return result.toString();
    },
  },
  {
    name: 'status_string',
    title: 'Status',
  },
];

const MainWrapper = styled.div`
  padding: 0 30px;
`;

const ActionsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px -14px 0;
  padding: 20px;

  > button {
    margin: 0 4px !important;
  }
`;

const menuButtonStyle = css`
  position: fixed;
  z-index: 3;
  top: 74px;
  left: 24px;
  margin: 0;
`;

function createdCompartor(
  { create_time: a }: Transaction,
  { create_time: b }: Transaction,
): -1 | 0 | 1 {
  if (a === b) {
    return 0;
  }

  return a < b ? 1 : -1;
}

const Wallet = () => {
  useEffect(() => {
    getRateFx();
  }, []);

  const [active, setActive] = useState(null);
  const [activeTab, setActiveTab] = useState(WalletTab.funds);
  const assets = useStore($assets);
  const mainAsset = assets.find((asset) => asset.asset_id === 0);
  const transactions = useStore($transactions);

  const toggleActive = (asset_id: number) => {
    setActive(active === asset_id ? null : asset_id);
  };

  const filtered = isNil(active)
    ? transactions : transactions.filter(({ asset_id }) => asset_id === active);
  const sorted = filtered.sort(createdCompartor);
  const sliced = sorted.slice(0, TXS_MAX);

  const selectedHandler = (tab: WalletTab) => {
    setActiveTab(tab);
  };

  return (
    <Window title="Wallet" primary>
      <Header />
      <MainWrapper>
        <Balance mainAsset={mainAsset} />
        <Buttons />
        <Tabs activeTab={activeTab} selected={selectedHandler} />
      </MainWrapper>
      {activeTab === WalletTab.funds && <Funds data={assets} /> }
      {activeTab === WalletTab.transactions && <Transactions data={sliced} /> }
    </Window>
  );
};

export default Wallet;
