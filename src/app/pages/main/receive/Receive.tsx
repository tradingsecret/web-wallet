/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { styled } from '@linaria/react';
import { useStore } from 'effector-react';

import { Input, Window } from '@uikit';

import AmountInput from '@uikit/AmountInput';

import { fromGroths, truncate } from '@core/utils';
import { $selected } from '@pages/main/send/model';
import {
  ButtonsWrapper,
  InputAmountStylePurple,
  InputLabel,
  InputStylePurple,
  InputWrapper,
  WalletForm,
  WalletTitle,
  WrapperWallet,
} from '@pages/main/styles';
import {
  $addressPreview, $amount, copyAddress, copyAndClose, createAddressFx, setAmount,
} from './model';

const AddresStyled = styled.div`
  line-height: 24px;
`;

const TipStyled = styled.div`
  line-height: 1.14;
  margin-top: 10px;
  font-family: SFProDisplay;
  font-size: 14px;
  font-style: italic;
  color: var(--color-gray);
`;

const WarningStyled = styled(TipStyled)`
  margin-bottom: 20px;
  text-align: center;
`;

const RowStyled = styled.div`
  display: flex;
`;

const LabelStyled = styled.label`
  flex-grow: 1;
`;

const FormStyled = styled.form`
  padding: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  position: relative;
`;

const InputWrapperType = styled(InputWrapper)`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 20px;
`;

const CopyButton = styled.button`
  position: absolute;
  bottom: -3px;
  right: 0;
  cursor: pointer;
  width: 34px;
  height: 38px;
  background-size: contain;
  border: 0;
  background: url("/assets/receive/copy_icon.png");
  
  :hover {
    background: url("/assets/receive/copy_icon.png");
  }
`;

const ButtonRegular = styled.button`
  cursor: pointer;
  width: 250px;
  height: 64px;
  background-size: 100% !important;
  background-repeat: no-repeat !important;
  margin: 0 auto;
  border: 0;
  background: url("/assets/receive/regular_btn_default.png");
  
  :hover, &.active {
    background: url("/assets/receive/regular_btn_hover.png");
  }
`;

const ButtonAnonymous = styled.button`
  cursor: pointer;
  width: 250px;
  height: 64px;
  background-size: 100% !important;
  background-repeat: no-repeat !important;
  margin: 0 auto;
  border: 0;
  background: url("/assets/receive/anonymous_btn_default.png");
  
  :hover, &.active {
    background: url("/assets/receive/anonymous_btn_hover.png");
  }
`;

const ButtonCopyAndGoBack = styled.button`
  cursor: pointer;
  width: 342px;
  height: 45px;
  background-size: contain;
  border: 0;
  background: url("/assets/receive/copy_back_btn_default.png");
  
  :hover {
    background: url("/assets/receive/copy_back_btn_hover.png");
  }
`;

const CopiedMessage = styled.div`
  font-family: 'tomorrow',serif;
  font-style: italic;
  font-size: 16px;
  color: #be82fb;
  margin-top: 15px;
`;

const Receive = () => {
  const address = useStore($addressPreview);
  const selected = useStore($selected);
  const [amount, asset_id] = useStore($amount);
  const [maxAnonymity, setMaxAnonymity] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const copyAddressHandle = (event: React.MouseEvent): void => {
    copyAddress(event);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 30000000);
  };

  const groths = fromGroths(selected.available);

  useEffect(() => {
    createAddressFx({ type: maxAnonymity ? 'max_privacy' : 'offline' });
  }, [maxAnonymity]);

  return (
    <Window
      title="Receive"
      pallete="blue"
      withBack
    >
      <WrapperWallet>
        <WalletTitle>
          Balance:
          {' '}
          {`${truncate(String(groths))} ${truncate(selected.metadata_pairs.N)}`}
        </WalletTitle>
        <WalletForm onSubmit={copyAndClose}>
          <InputWrapper>
            <InputLabel htmlFor="receive_address">REGULAR ADDRESS</InputLabel>
            <InputContainer>
              <Input
                id="receive_address"
                variant="gray"
                readOnly
                value={address}
                className={InputStylePurple}
              />
              <CopyButton type="button" onClick={copyAddressHandle} />
            </InputContainer>
          </InputWrapper>
          <InputWrapper>
            <InputLabel htmlFor="receive_amount">REQUESTED AMOUNT (OPTIONAL)</InputLabel>
            <AmountInput
              className={InputAmountStylePurple}
              value={amount}
              asset_id={asset_id}
              onChange={setAmount}
            />
          </InputWrapper>
          <InputWrapperType>
            <ButtonRegular type="button" className={`${maxAnonymity ? '' : 'active'}`} onClick={() => setMaxAnonymity(false)} />
            <ButtonAnonymous type="button" className={`${maxAnonymity ? 'active' : ''}`} onClick={() => setMaxAnonymity(true)} />
          </InputWrapperType>
          {isCopied && <CopiedMessage>Copied!</CopiedMessage>}
        </WalletForm>
      </WrapperWallet>
      <ButtonsWrapper>
        <ButtonCopyAndGoBack onClick={copyAndClose} />
      </ButtonsWrapper>
    </Window>
  );
};

export default Receive;
