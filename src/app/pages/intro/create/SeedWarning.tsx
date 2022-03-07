import React, { useEffect } from 'react';
import { styled } from '@linaria/react';

import {
  Window,
} from '@uikit';

import { gotoBack, View, setView } from '@app/model/view';

import { generateSeedFx } from '@app/model/base';

import {
  ButtonsWrapper, Back, Next, Title, Wrapper,
} from '@pages/intro/create/styles';

const SubTitle = styled.div`
  font-family: "agency",serif;
  font-weight: normal;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
  padding-top: 10px;
  letter-spacing: 1px;
  width: 250px;
  text-align: center;
  margin: 0 auto;
`;

const Notification = styled.div`
  font-family: "agency",serif;
  font-weight: normal;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
  text-decoration: underline;
  padding-top: 20px;
  letter-spacing: 2px;
`;

const ImportantWrapper = styled.div`
  font-family: "agency",serif;
  font-weight: bold;
  font-size: 13px;
  color: #5fe795;
  text-transform: uppercase;
  padding-top: 60px;
  letter-spacing: 2px;
`;

const ImportantHead = styled.div`
  font-size: 25px !important;
`;

const ImportantListWrapper = styled.div`
  padding-top: 15px;
`;

const ImportantList = styled.ul`
  padding-top: 10px;
  
  li {
    padding-right: 10px;
    
    ::before {
      content: '-';
      padding-right: 5px;
    }

    padding-bottom: 15px;
  }
`;

const WarningListStyled = styled.ul`
  > li {
    position: relative;
    height: 34px;
    line-height: 34px;
    margin-bottom: 20px;
    padding-left: 60px;
    text-align: left;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  p {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
    margin: 0;
  }
`;

const SeedWarning: React.FC = () => {
  useEffect(() => {
    generateSeedFx();
  }, []);

  return (
    <Window>
      <Wrapper>
        <Title><h1>Create new wallet</h1></Title>
        <SubTitle>Create new wallet with generating seed phrase.</SubTitle>
        <Notification>
          Please save the seed phrase for further
          wallet restoring if you lose access to it.
        </Notification>
        <ImportantWrapper>
          <ImportantHead>IMPORTANT!</ImportantHead>
          <ImportantListWrapper>
            <ImportantList>
              <li>Don't show anyone your seed phrase</li>
              <li>
                Never type your seed phrase into
                password managers or any other
                such software
              </li>
              <li>Keep your seed phrase in a safe place</li>
            </ImportantList>
          </ImportantListWrapper>
        </ImportantWrapper>
        <ButtonsWrapper>
          <Back
            type="button"
            onClick={gotoBack}
          />
          <Next
            type="button"
            onClick={() => setView(View.SEED_WRITE)}
          />
        </ButtonsWrapper>
      </Wrapper>
    </Window>
  );
};

export default SeedWarning;
