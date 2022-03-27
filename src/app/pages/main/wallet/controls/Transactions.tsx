import React from 'react';
import { styled } from '@linaria/react';

import {
  Contract, Transaction, TxStatusString, TxStatusToString,
} from '@app/core/types';

import { fromGroths, isNil, toUSD } from '@app/core/utils';
import { css } from '@linaria/core';
import { useStore } from 'effector-react';
import { $rate } from '@model/rates';

interface TransactionsProps {
  data: Transaction[];
}

const TransactionsWrap = styled.div`
  margin-top: 5px;
`;

const TransactionStyled = styled.div`
  background: url("/assets/wallet/funds/asset_line_default.png");
  height: 61px;
  width: 100%;
  padding: 14px 30px 8px 30px;
  justify-content: space-between;
  font-family: "tomorrow",serif !important;
  font-size: 16px;
  position: relative;
  color: #fff;
  display: flex;
  flex-direction: column;
  letter-spacing: 1px !important;
  
  .arrow {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 38px;
    background: url("/assets/wallet/funds/arrow_default.png");
  }
  
  :hover {
    background: url("/assets/wallet/funds/asset_line_hover.png");

    .arrow {
      background: url("/assets/wallet/funds/arrow_hover.png");
    }
  }
`;

const TransactionRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #fff;
`;

const Currency = styled.div`
  text-align: left;
`;

const Amount = styled.div`
  text-align: left;
`;

const Status = styled.div`
  text-align: left;
  color: #6e6e6e;
  font-size: 11px;
`;

const Rate = styled.div`
  text-align: right;
`;

const USDAmount = styled.div`
  text-align: right;
`;

const up = css`
  color: #63a80a;
`;

const down = css`
  color: #f60707;
`;

const fromInvokeData = (data: Contract, fee: number): Partial<Transaction> => {
  if (data.amounts.length === 1) {
    const [{ amount, asset_id }] = data.amounts;

    const value = asset_id === 0 && amount < 0 ? amount + fee : amount;

    return {
      value: Math.abs(value),
      income: amount < 0,
      asset_id,
    };
  }

  return null;
};

function swapKeysAndValues(obj) {
  const swapped = Object.entries(obj).map(
    ([key, value]) => [value, key],
  );

  return Object.fromEntries(swapped);
}

const Transactions: React.FC<TransactionsProps> = ({
  data: transactions,
}) => {
  const rates = useStore($rate);
  
  return (
    <TransactionsWrap>
      { transactions.map((tx, index) => {
        const { invoke_data: contracts } = tx;
        const payload = isNil(contracts) ? null : fromInvokeData(contracts[0], tx.fee);

        const data = isNil(payload) ? tx : {
          ...tx,
          ...payload,
        };

        return (
          <TransactionStyled>
            <TransactionRow>
              <Amount>
                <span className={`${data.income ? up : down}`}>
                  {data.income ? '+' : '-'}
                  {' '}
                  {fromGroths(data.value)}
                </span>
                {' '}
                ARC
              </Amount>
              {rates && rates.rate && (
              <Rate>
                $
                {rates.rate}
                {' '}
                USD
              </Rate>
              )}
            </TransactionRow>
            <TransactionRow>
              <Status>{TxStatusToString[data.status_string]}</Status>
              {rates && rates.rate && (
              <USDAmount className={`${data.income ? up : down}`}>
                { toUSD(fromGroths(data.value), rates.rate) }
              </USDAmount>
              )}
            </TransactionRow>
          </TransactionStyled>
        );
      })}
    </TransactionsWrap>
  );
};

export default Transactions;
