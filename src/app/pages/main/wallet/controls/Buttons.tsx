import React from 'react';
import { styled } from '@linaria/react';
import { gotoSend, gotoReceive } from '@app/model/view';

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
`;

const Button = styled.button`
  width: 162px;
  height: 45px;
  background-size: contain;
  border: 0;
`;

const ButtonSend = styled(Button)`
  background: url("/assets/wallet/buttons/send_btn_default.png");
  
  :hover {
    background: url("/assets/wallet/buttons/send_btn_hover.png");
  }
`;

const ButtonReceive = styled(Button)`
  background: url("/assets/wallet/buttons/receive_btn_default.png");

  :hover {
    background: url("/assets/wallet/buttons/receive_btn_hover.png");
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const Buttons = () => (
  <ButtonsWrapper>
    <ButtonReceive onClick={gotoReceive} />
    <ButtonSend onClick={gotoSend} />
  </ButtonsWrapper>
);
