import React from 'react';

import { styled } from '@linaria/react';

const Wrap = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const LogoStyled = styled.div`
  width: 236px;
  height: 26px;
  background-image: url('/assets/insider_bottom_logo.png');
  background-repeat: no-repeat;
  background-position-x: center;
`;

const PoweredBy = styled.div`
  font-family: 'maryiad',serif;
  font-weight: normal;
  font-style: normal;
  font-size: 12.7px;
  color: #fff;
`;

const LogoBottom: React.FC = () => (
  <>
    <Wrap>
      <PoweredBy>POWERED BY</PoweredBy>
      <LogoStyled />
    </Wrap>
  </>
);

export default LogoBottom;
