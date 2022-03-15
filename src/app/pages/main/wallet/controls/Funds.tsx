import React from 'react';
import { styled } from '@linaria/react';
import { AssetTotal } from '@model/wallet';
import { fromGroths } from '@core/utils';

interface AssetsProps {
  data: AssetTotal[];
}

const FundsWrap = styled.div`
  margin-top: 5px;
`;

const FundsStyled = styled.div`
  background: url("/assets/wallet/funds/asset_line_default.png");
  height: 61px;
  width: 100%;
  padding: 14px 90px 8px 30px;
  display: flex;
  justify-content: space-between;
  font-family: "agency",serif;
  font-size: 16px;
  position: relative;
  
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

const FundsStyledLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FundsStyledRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Currency = styled.div`
  text-align: left;
`;

const Amount = styled.div`
  color: #d5ff9f;
  text-align: left;
`;

const Rate = styled.div`
  text-align: right;
  color: #f60707;
`;

const USDAmount = styled.div`
  text-align: right;
`;

export const Funds: React.FC<AssetsProps> = ({ data }) => (
  <FundsWrap>
    {data.filter((asset) => asset.asset_id === 0).map(({ asset_id, available, metadata_pairs }) => (
      <FundsStyled>
        <FundsStyledLeft>
          <Currency>ARC</Currency>
          <Amount>{fromGroths(available)}</Amount>
        </FundsStyledLeft>
        <FundsStyledRight>
          <Rate>13.5</Rate>
          <USDAmount>1000 USD</USDAmount>
        </FundsStyledRight>
        <div className="arrow" />
      </FundsStyled>
    ))}
  </FundsWrap>
);
