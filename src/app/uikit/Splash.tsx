import React from 'react';
import { styled } from '@linaria/react';
import { isNil } from '@core/utils';

import { css } from '@linaria/core';
import LogoBottom from '@uikit/LogoBottom';
import Logo from './Logo';
import BackButton from './BackButton';

interface SplashProps {
  size?: 'large' | 'small';
  blur?: boolean;
  onReturn?: React.MouseEventHandler;
}

const ContainerStyled = styled.div<SplashProps>`
  filter: ${({ blur }) => (blur ? 'blur(3px)' : 'none')};
  position: relative;
  height: 600px;
  background-image: url('/assets/background.png');
  text-align: center;
`;

const HeaderText = styled.div`
  font-size: 13.5px;
  color: #fff;
  position: absolute;
  top: 20px;
  width: 320px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  font-style: normal;
`;

const VersionText = styled.div`
  font-size: 10.7px;
  color: #fff;
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  font-style: normal;
`;

const backButtonStyle = css`
  top: 23px;
`;

export const Splash: React.FC<SplashProps> = ({
  size,
  blur,
  onReturn,
  children,
}) => (
  <ContainerStyled blur={blur}>
    {!isNil(onReturn) && <BackButton onClick={onReturn} className={backButtonStyle} />}
    <HeaderText>
      Full Privacy Cryptocurrency Platform with Atomic Swaps by the Mechanics of the Future
    </HeaderText>
    <VersionText>v 1.01</VersionText>
    <Logo size={size} />
    {children}
    <LogoBottom />
  </ContainerStyled>
);

export default Splash;
