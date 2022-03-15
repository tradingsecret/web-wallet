import React, { useRef } from 'react';
import { useStore } from 'effector-react';

import { View, setView, gotoBack } from '@app/model/view';
import { setSeed } from '@app/model/base';
import { Button, Footer, Window } from '@app/uikit';
import SeedList from '@pages/intro/seed';
import {
  ButtonsWrapper, Next, Title, Wrapper, NotificationWrapper, Back,
} from '@pages/intro/styles';

import {
  $cache,
  $errors,
  $valid,
  setCache,
  onInput,
} from '@pages/intro/seed/model';

const Restore: React.FC = () => {
  const errors = useStore($errors);
  const cache = useStore($cache);
  const valid = useStore($valid);
  const formRef = useRef(null);

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = data.values() as IterableIterator<string>;

    const seed = Array.from(values).reduce(
      (result, value, index) => (index === 0 ? value : `${result} ${value}`),
    );

    setSeed([seed, true]);
    setCache(seed);
    setView(View.SET_PASSWORD);
  };

  return (
    <Window title="Restore wallet">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Wrapper>
          <Title><h1>Type in your seed phrase</h1></Title>
          <SeedList
            data={errors}
            initial={cache}
            onInput={onInput}
          />
        </Wrapper>
        <ButtonsWrapper>
          <Back
            type="button"
            onClick={gotoBack}
          />
          <Next disabled={!valid} type="submit" />
        </ButtonsWrapper>
      </form>
    </Window>
  );
};

export default Restore;
