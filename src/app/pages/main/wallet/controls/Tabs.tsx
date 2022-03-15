import React from 'react';
import { styled } from '@linaria/react';
import { WalletTab } from '@core/types';

interface TabsParams {
  activeTab: WalletTab | undefined;
  selected: Function;
}

const TabsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
`;

const Tab = styled.div`
  :hover {
    color: #d5ff9f;
  }

  cursor: pointer;
`;

const TabFunds = styled(Tab)`
  width: 102px;
  max-width: 102px;
`;

const TabTransactions = styled(Tab)`
  width: 168px;
  max-width: 168px;
`;

const TabText = styled.div`
  font-family: "agency",serif;
  font-size: 25px;
  padding: 0 15px;
`;

const TabBackground = styled.img`
  width: 100%;
  height: 20px;
`;

// eslint-disable-next-line import/prefer-default-export
export const Tabs: React.FC<TabsParams> = ({ activeTab, selected }) => (
  <TabsWrapper>
    <TabFunds onClick={() => selected(WalletTab.funds)}>
      <TabText>FUNDS</TabText>
      {activeTab === WalletTab.funds && <TabBackground src="/assets/wallet/tab/hover_line.png" />}
    </TabFunds>
    <TabTransactions onClick={() => selected(WalletTab.transactions)}>
      <TabText>TRANSACTIONS</TabText>
      {activeTab === WalletTab.transactions && <TabBackground src="/assets/wallet/tab/hover_line.png" />}
    </TabTransactions>
  </TabsWrapper>
);
