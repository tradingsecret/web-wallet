import React from 'react';
import { styled } from '@linaria/react';

const HeaderWrapper = styled.div`
  display: flex;
  font-family: "agency",serif;
  height: 42px;
  width: 100%;
  background: url("/assets/wallet/header/main_btn_bg.png");
  background-repeat: repeat-y;
  background-size: 200% 100%;
`;

const HeaderButtonMainWrapper = styled.div`
  width: 100%;
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
      <HeaderButtonRight>
        <HeaderButtonWrapper>
          <HeaderButtonContent>TESTNET</HeaderButtonContent>
        </HeaderButtonWrapper>
      </HeaderButtonRight>
    </HeaderButtonMainWrapper>
  </HeaderWrapper>
);
