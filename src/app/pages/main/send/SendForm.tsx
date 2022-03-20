/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import { useStore } from 'effector-react';

import { Input, Window } from 'app/uikit';

import { AmountInput } from '@uikit';

import { styled } from '@linaria/react';
import { fromGroths, truncate } from '@app/core/utils';
import {
  InputAmountStyle,
  InputLabel,
  InputStyle,
  InputWrapper,
  WalletForm,
  WalletTitle,
  WrapperWallet,
  ButtonsWrapper,
} from '@pages/main/styles';
import {
  $address,
  $addressData,
  $amount,
  $amountError,
  $description,
  $offline,
  $selected,
  $valid,
  onAddressChange,
  onFormSubmit,
  setAmount,
  setHalfAmount,
  setMaxAmount,
} from './model';

const ErrorMessage = styled.div`
  margin-top: 15px;
  color: #ff0000;
  font-size: 14px;
  font-family: 'tomorrow',serif;
  font-style: italic;
  text-transform: uppercase;
`;

const AmountOptionButton = styled.button`
  cursor: pointer;
  width: 129px;
  height: 36px;
  background-size: contain;
  border: 0;
`;

const ButtonsAmountWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const ButtonHalf = styled(AmountOptionButton)`
  background: url("/assets/send/half_btn_default.png");
  
  :hover {
    background: url("/assets/send/half_btn_hover.png");
  }
`;

const ButtonSend = styled(AmountOptionButton)`
  background: url("/assets/send/max_btn_default.png");
  
  :hover {
    background: url("/assets/send/max_btn_hover.png");
  }
`;

const ButtonConfirm = styled.button`
  cursor: pointer;
  width: 342px;
  height: 45px;
  background-size: contain;
  border: 0;
  background: url("/assets/send/confirm_btn_default.png");
  
  :hover {
    background: url("/assets/send/confirm_btn_hover.png");
  }
`;

const SendForm = () => {
  const amountInputRef = useRef(null);
  const address = useStore($address);
  const offline = useStore($offline);
  // const comment = useStore($comment);
  const [amount, asset_id] = useStore($amount);

  const {
    type: addressType,
    is_valid: addressValid,
  } = useStore($addressData);

  const amountError = useStore($amountError);

  const [label, warning] = useStore($description);

  const selected = useStore($selected);
  const valid = useStore($valid);

  const groths = fromGroths(selected.available);

  return (
    <Window
      title="Send"
      pallete="purple"
    >
      <WrapperWallet>
        <WalletTitle>
          Balance:
          {' '}
          {`${groths} ${truncate(selected.metadata_pairs.N)}`}
        </WalletTitle>
        <WalletForm onSubmit={onFormSubmit}>
          <InputWrapper>
            <InputLabel htmlFor="send_recipient">RECIPIENT ADDRESS</InputLabel>
            <Input
              id="send_recipient"
              variant="gray"
              label={label}
              valid={address === '' || label === null || addressValid}
              value={address}
              onInput={onAddressChange}
              className={InputStyle}
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel htmlFor="send_amount">SENDING AMOUNT</InputLabel>
            <AmountInput
              className={InputAmountStyle}
              value={amount}
              asset_id={asset_id}
              onChange={setAmount}
            />
          </InputWrapper>
          <ButtonsAmountWrapper>
            <ButtonHalf type="button" onClick={setHalfAmount} />
            <ButtonSend type="button" onClick={setMaxAmount} />
          </ButtonsAmountWrapper>
          {amountError && <ErrorMessage>INSUFFICIENT FUNDS</ErrorMessage>}
        </WalletForm>
      </WrapperWallet>
      <ButtonsWrapper>
        <ButtonConfirm onClick={onFormSubmit} />
      </ButtonsWrapper>
    </Window>
  );
};

export default SendForm;

/**
 * <form onSubmit={onFormSubmit}>
 *         <Section title="Send to" variant="gray">
 *           <Input
 *             variant="gray"
 *             label={label}
 *             valid={address === '' || label === null || addressValid}
 *             placeholder="Paste recipient address here"
 *             value={address}
 *             onInput={onAddressChange}
 *           />
 *         </Section>
 *         { addressType === 'offline' && (
 *         <Section title="Transaction Type" variant="gray">
 *           <LabeledToggle
 *             left="Online"
 *             right="Offline"
 *             value={offline}
 *             onChange={setOffline}
 *           />
 *         </Section>
 *         ) }
 *         <Section title="Amount" variant="gray">
 *           <AmountInput
 *             value={amount}
 *             asset_id={asset_id}
 *             error={amountError}
 *             onChange={setAmount}
 *           />
 *           <Title variant="subtitle">Available</Title>
 *           {`${groths} ${truncate(selected.metadata_pairs.N)}`}
 *           { selected.asset_id === 0 && isNil(amountError) && <Rate value={groths} /> }
 *           { groths > 0 && (
 *             <Button
 *               icon={ArrowUpIcon}
 *               variant="link"
 *               pallete="purple"
 *               className={maxButtonStyle}
 *               onClick={setMaxAmount}
 *             >
 *               max
 *             </Button>
 *           )}
 *         </Section>
 *         <WarningStyled>{ warning }</WarningStyled>
 *         <Button
 *           pallete="purple"
 *           icon={ArrowRightIcon}
 *           type="submit"
 *           disabled={!valid}
 *         >
 *           next
 *         </Button>
 *       </form>
 */
