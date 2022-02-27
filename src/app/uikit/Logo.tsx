import React from 'react';
import { css } from '@linaria/core';

import { styled } from '@linaria/react';

interface LogoProps {
  size?: 'large' | 'small' | 'icon';
}

const LogoClassName = css`
  display: block;
  margin: 0 auto 20px;
`;

const DIMENSIONS = {
  large: {
    width: 159,
    height: 139,
  },
  small: {
    width: 100,
    height: 88,
  },
  icon: {
    width: 42,
    height: 37,
  },
};

const LogoStyled = styled.div`
  position: absolute;
  height: 250px;
  width: 252px;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-image: url('/assets/imperium_helmet_logo.png');
  background-repeat: no-repeat;
  background-position-x: center;
`;

const SubLogoStyled = styled.div`
  position: absolute;
  height: 90px;
  width: 392px;
  top: 260px;
  left: 50%;
  transform: translateX(-50%);
  background-image: url('/assets/imperium_logo.png');
  background-repeat: no-repeat;
  background-position-x: center;
`;

/*
const Logo: React.FC<LogoProps> = ({ size = 'large' }) => {
  const viewBox = '0 0 159 139';
  const dimensions = DIMENSIONS[size];
  return (
    <LogoIcon {...dimensions} viewBox={viewBox} className={LogoClassName} />
  );
}; */

const Logo: React.FC<LogoProps> = ({ size = 'large' }) => (
  <>
    <LogoStyled />
    <SubLogoStyled />
  </>
);

export default Logo;
