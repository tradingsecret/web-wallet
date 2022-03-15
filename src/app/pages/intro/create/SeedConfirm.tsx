import React, { useState } from 'react';

import { Button, Footer, Window } from 'app/uikit';
import { ArrowRightIcon } from '@app/icons';

import { $ids, $words, generateSeedFx } from '@app/model/base';
import { useStore } from 'effector-react';
import { gotoBack, setView, View } from '@app/model/view';
import SeedList from '@pages/intro/seed';

import {
  ButtonsWrapper, Next, Title, Wrapper, NotificationWrapper, Back,
} from '@pages/intro/styles';
import { styled } from '@linaria/react';

const SEED_CONFIRM_COUNT = 6;

const SeedConfirm: React.FC = () => {
  const seed = useStore($words);
  const ids = useStore($ids);

  const [errors, setErrors] = useState(
    new Array(SEED_CONFIRM_COUNT).fill(null),
  );
  const valid = errors.every((value) => value === true);

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const index = parseInt(name, 10);
    const result = seed[index] === value;
    const target = ids.indexOf(index);

    if (errors[target] !== result) {
      const next = errors.slice();
      next[target] = result;
      setErrors(next);
    }
  };

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    setView(View.SET_PASSWORD);
  };

  const handlePrevious: React.MouseEventHandler = () => {
    generateSeedFx();
    setView(View.SEED_WRITE);
  };

  return (
    <Window onPrevious={handlePrevious}>
      <Wrapper>
        <Title><h1>Confirm seed phrase</h1></Title>
        <NotificationWrapper>
          <p>
            Your seed phrase is the access key to all the funds in your wallet.
            Print or write down the phrase to keep it in a safe or in a locked
            vault. Without the phrase you will not be able to recover your
            money.
          </p>
        </NotificationWrapper>
        <form autoComplete="off" onSubmit={handleSubmit} noValidate>
          <SeedList indexByValue data={ids} errors={errors} onInput={handleInput} />
        </form>
      </Wrapper>
      <ButtonsWrapper>
        <Back
          type="button"
          onClick={gotoBack}
        />
        <Next
          type="submit"
          onClick={handleSubmit}
          disabled={!!valid}
        />
      </ButtonsWrapper>
    </Window>
  );
};

export default SeedConfirm;
