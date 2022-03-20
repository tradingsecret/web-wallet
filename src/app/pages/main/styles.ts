import { styled } from '@linaria/react';
import { css } from '@linaria/core';

export const Wrapper = styled.div`
  padding: 0 30px;
`;

export const WrapperWallet = styled.div`
  position: relative;
  padding: 25px 50px 50px;
`;

export const WalletTitle = styled.div`
  font-family: "agency",serif;
  font-weight: bold;
  font-size: 30px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 4px;
`;

export const WalletForm = styled.form`
  padding-top: 50px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-top: 40px;
  
  :first-child {
    margin-top: 0 !important;
  }
`;

export const ButtonsWrapper = styled.div`
  position: absolute;
  bottom: 80px;
  display: flex;
  gap: 15px;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
`;

export const InputLabel = styled.label`
  font-family: "tomorrow",serif;
  font-weight: bold;
  text-align: left;
  font-size: 14px;
`;

export const InputStyle = css`
  input {
    border-bottom: 2px dashed white !important;
    color: #15a901;
    font-size: 20px;
    text-transform: uppercase;
    padding: 25px 10px 15px !important;
  }
`;

export const InputStylePurple = css`
  input {
    border-bottom: 2px dashed white !important;
    color: #b948e8 !important;
    font-size: 20px;
    text-transform: uppercase;
    padding: 25px 10px 15px !important;
  }
`;

export const InputAmountStyle = css`
  input {
    border-bottom: 2px dashed white !important;
    font-family: "tomorrow",serif;
    color: #15a901 !important;
    font-size: 20px !important;
    font-weight: normal !important;
    text-transform: uppercase !important;
    padding: 25px 10px 15px !important;
  }
`;

export const InputAmountStylePurple = css`
  input {
    border-bottom: 2px dashed white !important;
    font-family: "tomorrow",serif;
    color: #b948e8 !important;
    font-size: 20px !important;
    font-weight: normal !important;
    text-transform: uppercase !important;
    padding: 25px 10px 15px !important;
  }
`;
