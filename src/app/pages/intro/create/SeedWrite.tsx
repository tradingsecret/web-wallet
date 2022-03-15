import React, { useState } from 'react';
import { useStore } from 'effector-react';
import { styled } from '@linaria/react';

import {
  Window, Popup, Button,
} from '@uikit';
import { View, setView, gotoBack } from '@app/model/view';
import { $seed } from '@app/model/base';

import {
  ButtonsWrapper, Back, Next, Title, Wrapper, NotificationWrapper,
} from '@pages/intro/styles';

import {
  DoneIcon,
} from '@app/icons';

const SeedListStyled = styled.ol`
  counter-reset: counter;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 10px;
  font-family: "agency",serif;
  font-weight: normal;
  text-transform: uppercase;
  color: #5fe795;
  font-size: 15px;

  > li {
    counter-increment: counter;
    display: inline-block;
    width: 140px;
    height: 32px;
    margin-bottom: 10px;
    text-align: left;

    &:before {
      display: inline-block;
      content: counters(counter, '.') " .";
      width: 30px;
      height: 20px;
      margin: 5px 10px 5px 9px;
      text-align: center;
  }
`;

const SeedWrite: React.FC = () => {
  const [warningVisible, toggleWarning] = useState(false);
  const [seed] = useStore($seed);

  const handleSkipClick: React.MouseEventHandler = () => {
    setView(View.SET_PASSWORD);
  };

  const handleNextClick: React.MouseEventHandler = () => {
    setView(View.SEED_CONFIRM);
  };

  const handleCancel: React.MouseEventHandler = () => {
    toggleWarning(false);
  };

  return (
    <>
      <Window>
        <Wrapper>
          <Title><h1>Seed phrase</h1></Title>
          <NotificationWrapper>
            <p>
              Please save your seed phrase as it’s the access
              to your Imperium Protocol Wallet address. For easy
              saving please use the Print Seed Phrase button
              down below.Keep your printed seed phrase in
              a secured vault. If you lose access to your
              Imperium Protocol Wallet you can access it by
              Restoring your wallet using the seed phrase,
              otherwise, you might lose the access and
              stored funds in it.
            </p>
          </NotificationWrapper>
          <SeedListStyled>
            {seed.split(' ').map((value, index) => (
            // eslint-disable-next-line
            <li key={index}>{value}</li>
            ))}
          </SeedListStyled>
        </Wrapper>
        <ButtonsWrapper>
          <Back
            type="button"
            onClick={() => setView(View.SEED_WARNING)}
          />
          <Next
            type="button"
            onClick={() => toggleWarning(true)}
          />
        </ButtonsWrapper>
      </Window>
      <Popup
        visible={warningVisible}
        title="Save seed phrase"
        confirmButton={(
          <Button
            icon={DoneIcon}
            onClick={handleNextClick}
          >
            done
          </Button>
        )}
        onCancel={handleCancel}
      >
        Please write the seed phrase down. Storing it in a file makes it
        prone to cyber attacks and, therefore, less secure.
      </Popup>
    </>
  );
};

export default SeedWrite;
