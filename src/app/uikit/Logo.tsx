import React from 'react';

import { styled } from '@linaria/react';

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
  width: 348px;
  top: 260px;
  left: 50%;
  transform: translateX(-50%);
  background-image: url('/assets/imperium_logo.png');
  background-repeat: no-repeat;
  background-size: contain;
`;

/*
const Logo: React.FC<LogoProps> = ({ size = 'large' }) => {
  const viewBox = '0 0 159 139';
  const dimensions = DIMENSIONS[size];
  return (
    <LogoIcon {...dimensions} viewBox={viewBox} className={LogoClassName} />
  );
}; */

const Logo: React.FC = () => (
  <>
    <LogoStyled />
    <SubLogoStyled />
  </>
);

export default Logo;
