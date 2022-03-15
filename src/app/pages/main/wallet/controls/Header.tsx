import React from 'react';
import { styled } from '@linaria/react';

const HeaderWrapper = styled.div`
  display: flex;
  font-family: "agency",serif;
  height: 70px;
  width: 100%;
  background: url("/assets/wallet/header/main_btn_bg.png");
  background-size: contain;
`;
const HeaderButtonMainWrapper = styled.div`
  width: 50%;
  height: 100%;
`;

const HeaderButton = styled.div`
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
  position: relative;
`;

const HeaderButtonLeft = styled(HeaderButton)`
  background: url("/assets/wallet/header/left_btn_default.png");
  
  :hover {
    background: url("/assets/wallet/header/left_btn_hover.png");
  }
`;

const HeaderButtonRight = styled(HeaderButton)`
  background: url("/assets/wallet/header/right_btn_default.png");
  
  :hover {
    background: url("/assets/wallet/header/right_btn_hover.png");
  }
`;

const HeaderButtonWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
const HeaderButtonTitle = styled.div``;
const HeaderButtonContent = styled.div`
  color: #5fe795;
`;

// eslint-disable-next-line import/prefer-default-export
export const Header = () => (
  <HeaderWrapper>
    <HeaderButtonMainWrapper>
      <HeaderButtonLeft>
        <HeaderButtonWrapper>
          <HeaderButtonTitle>CURRENT WALLET</HeaderButtonTitle>
          <HeaderButtonContent>0x49fk...95jdfir</HeaderButtonContent>
        </HeaderButtonWrapper>
      </HeaderButtonLeft>
    </HeaderButtonMainWrapper>
    <HeaderButtonMainWrapper>
      <HeaderButtonRight>
        <HeaderButtonWrapper>
          <HeaderButtonTitle>CURRENT NETWORK</HeaderButtonTitle>
          <HeaderButtonContent>TESTNET</HeaderButtonContent>
        </HeaderButtonWrapper>
      </HeaderButtonRight>
    </HeaderButtonMainWrapper>
  </HeaderWrapper>
);
