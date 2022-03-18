/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useStore } from 'effector-react';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { AssetLabel, Input, Rate } from '@uikit';
import Select, { Option } from '@uikit/Select';

import { isNil, toGroths, truncate } from '@app/core/utils';

import { AMOUNT_MAX } from '@app/model/rates';
import { $assets } from '@app/model/wallet';
import AssetIcon from './AssetIcon';

const ContainerStyled = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 20px;
  width: 100%;
`;

const LabelStyled = styled.div`
  display: inline-block;
  vertical-align: bottom;
  line-height: 24px;
  font-family: "tomorrow",serif;
  font-size: 24px;
`;

const selectClassName = css`
  align-self: flex-start;
  margin-top: 10px;
`;

const containerStyle = css`
  width: 50%;
`;

interface AmountInputProps {
  value: string;
  asset_id: number;
  error?: string;
  pallete?: 'purple' | 'blue';
  onChange?: (value: [string, number]) => void;
  className?: any;
}

const REG_AMOUNT = /^(?!0\d)(\d+)(\.)?(\d+)?$/;

const rateStyle = css`
  position: absolute;
  top: 33px;
  left: 0;
`;

const AmountInput: React.FC<AmountInputProps> = ({
  value,
  asset_id,
  error,
  pallete = 'purple',
  onChange,
  className = undefined,
}) => {
  const assets = useStore($assets);

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value: raw } = event.target;

    if (raw !== '' && !REG_AMOUNT.test(raw)) {
      return;
    }

    const next = parseFloat(raw) > AMOUNT_MAX
      ? AMOUNT_MAX.toString() : raw;
    onChange([next, asset_id]);
  };

  const handleSelect = (next: number) => {
    onChange(['', next]);
  };

  return (
    <ContainerStyled className={className}>
      <Input
        variant="amount"
        valid={isNil(error)}
        label={error}
        value={value}
        pallete={pallete}
        maxLength={16}
        className={containerStyle}
        onInput={handleInput}
      />
      {/* asset_id === 0 && <Rate value={parseFloat(value)} className={rateStyle} /> */}
      <Select
        value={asset_id}
        className={selectClassName}
        onSelect={handleSelect}
      >
        { assets
          .map(({ asset_id: id, metadata_pairs }) => (
            <Option key={id} value={id}>
              <LabelStyled>{ truncate(metadata_pairs.UN) }</LabelStyled>
            </Option>
          ))}
      </Select>
    </ContainerStyled>
  );
};

export default AmountInput;
