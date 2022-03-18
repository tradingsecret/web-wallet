/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import { useStore } from 'effector-react';

import {
  Window, Section, Input, Button, Rate,
} from 'app/uikit';

import {
  ArrowRightIcon,
  ArrowUpIcon,
} from '@app/icons';

import { AmountInput } from '@uikit';

import { styled } from '@linaria/react';
import LabeledToggle from '@app/uikit/LabeledToggle';
import { css } from '@linaria/core';
import { fromGroths, isNil, truncate } from '@app/core/utils';
import { restore } from 'effector';
import { Amount } from '@core/types';
import {
  $address,
  $offline,
  $amount,
  $comment,

  onAddressChange,
  onCommentChange,

  setOffline,
  setAmount,
  setHalfAmount,
  setMaxAmount,
  onFormSubmit,

  $valid,
  $selected,
  $addressData,
  $description,
  $amountError,
} from './model';

const WarningStyled = styled.div`
  margin: 30px -20px;
  font-family: 'SFProDisplay';
  font-style: italic;
  color: var(--color-gray);
`;

const maxButtonStyle = css`
  position: absolute;
  right: 20px;
  top: 138px;
`;

export const Wrapper = styled.div`
  position: relative;
  padding: 50px;
`;

export const Title = styled.div`
  font-family: "agency",serif;
  font-weight: bold;
  font-size: 30px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 4px;
`;

export const Form = styled.form`
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

const InputStyle = css`
  input {
    border-bottom: 2px dashed white !important;
    color: #15a901;
    font-size: 20px;
    text-transform: uppercase;
    padding: 25px 10px 15px !important;
  }
`;

const InputAmountStyle = css`
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

const InputLabel = styled.label`
  font-family: "tomorrow",serif;
  font-weight: bold;
  text-align: left;
  font-size: 14px;
`;

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

export const ButtonsWrapper = styled.div`
  position: absolute;
  bottom: 80px;
  display: flex;
  gap: 15px;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
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
      <Wrapper>
        <Title>
          Balance:
          {' '}
          {`${groths} ${truncate(selected.metadata_pairs.N)}`}
        </Title>
        <Form onSubmit={onFormSubmit}>
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
        </Form>
      </Wrapper>
      <ButtonsWrapper onClick={onFormSubmit}>
        <ButtonConfirm />
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
