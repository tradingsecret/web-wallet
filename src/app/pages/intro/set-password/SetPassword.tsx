import React, { useState } from 'react';
import { styled } from '@linaria/react';

import { Input, Popup, Window } from 'app/uikit';
import { ConfirmButton } from '@uikit/Popup';
import { gotoProgress, setView, View } from '@app/model/view';
import { makeOnChange } from '@core/utils';

import { createWallet } from '@app/core/api';
import { useStore } from 'effector-react';
import { $seed } from '@app/model/base';
import {
  Back, ButtonsWrapper, Next, Title, Wrapper,
} from '@pages/intro/styles';
import PasswordStrength from './PasswordStrength';

const FormStyled = styled.form`
  text-align: left;
  position: absolute;
  top: 170px;
  left: 50%;
  transform: translateX(-50%);

  > ul {
    margin-bottom: 30px;
    padding-left: 20px;
  }
`;
const FieldsWrapper = styled.div`
  width: 250px;
  margin: 0 auto;
`;

const SubTitle = styled.div`
  h2 {
    font-family: "agency",serif;
    font-weight: normal;
    font-size: 20px;
    letter-spacing: 2px;
  }
`;

const PasswordStrengthWrapper = styled.div`
  
`;

const InputWrapper = styled.div`
  input {
    font-size: 30px;
    -webkit-text-security: circle;
  }
`;

const InputWrapperSecond = styled(InputWrapper)`
  margin-top:30px;
`;

const ButtonsWrapperPassword = styled(ButtonsWrapper)`
  margin-top: 50px;
  display: flex;
`;

const InputLabel = styled.div`
  font-family: "agency",serif;
  font-weight: normal;
  font-size: 22px;
  letter-spacing: 2px;
  color: #5fe795;
  text-transform: uppercase;
`;

const SetPassword = () => {
  const [pass, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [warningVisible, toggleWarning] = useState(false);
  const [seed, restoring] = useStore($seed);

  const matched = pass === confirm;
  const valid = confirm === '' || matched;
  const ready = pass !== '' && matched;

  const error = valid ? null : 'Passwords do not match';

  const onPasswordChange = makeOnChange(setPassword);
  const onConfirmChange = makeOnChange(setConfirm);

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    createWallet({
      seed,
      password: pass,
      isSeedConfirmed: true,
    });
    gotoProgress();
  };

  const handlePrevious: React.MouseEventHandler = () => {
    if (restoring) {
      setView(View.RESTORE);
    } else {
      toggleWarning(true);
    }
  };

  const handleReturnClick: React.MouseEventHandler = () => {
    setView(View.SEED_WRITE);
  };

  return (
    <>
      <Window title="Password" onPrevious={handlePrevious}>
        <Wrapper>
          <Title><h1>Password</h1></Title>
          <SubTitle><h2>CREATE WALLET ACCESS PASSWORD</h2></SubTitle>
          <FormStyled onSubmit={handleSubmit}>
            <FieldsWrapper>
              <InputWrapper>
                <InputLabel>Password</InputLabel>
                <Input
                  autoFocus
                  type="password"
                  onChange={onPasswordChange}
                />
              </InputWrapper>
              {pass.length > 0
            && (
            <PasswordStrengthWrapper v-if={pass.length > 0}>
              <PasswordStrength value={pass} />
            </PasswordStrengthWrapper>
            )}
              <InputWrapperSecond>
                <InputLabel>Confirm Password</InputLabel>
                <Input
                  type="password"
                  valid={valid}
                  label={error}
                  onChange={onConfirmChange}
                />
              </InputWrapperSecond>
            </FieldsWrapper>
          </FormStyled>
        </Wrapper>
        <ButtonsWrapper>
          <Back
            type="button"
            onClick={handlePrevious}
          />
          <Next type="submit" disabled={!ready} onClick={handleSubmit} />
        </ButtonsWrapper>
      </Window>
      <Popup
        visible={warningVisible}
        title="Back to seed phrase screen"
        confirmButton={(
          <ConfirmButton onClick={handleReturnClick} />
            )}
        onCancel={() => toggleWarning(false)}
      >
        ATTENTION: If you go back to the seed phrase screen then it would be changed and the previously saved seed phrase won't fit anymore. And your local password won't be saved as well.
      </Popup>
    </>
  );
};

export default SetPassword;
