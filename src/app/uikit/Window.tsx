import React, { useState } from 'react';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import { gotoBack } from '@app/model/view';
import { isNil } from '@app/core/utils';
import { MenuIcon } from '@app/icons';

import LogoBottom from '@uikit/LogoBottom';
import Logo from './Logo';
import BackButton from './BackButton';
import Title from './Title';
import Button from './Button';
import Menu from './Menu';

interface WindowProps {
  title?: string;
  primary?: boolean;
  pallete?: 'default' | 'blue' | 'purple';
  onPrevious?: React.MouseEventHandler;
}

function getColor(pallete: string): string {
  switch (pallete) {
    case 'blue':
      return 'var(--color-blue)';
    case 'purple':
      return 'var(--color-purple)';
    default:
      return '#035b8f';
  }
}

const ContainerStyled = styled.div<WindowProps>`
  position: relative;
  min-height: 600px;
  //padding: 0 30px 30px;
  text-align: center;
  background-image:  ${({ primary }) => (primary ? 'url("/assets/wallet_bg.png")' : 'inherit')}

  /*
  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 50px;
    left: 0;
    width: 100%;
    height: 100px;
    background-image: linear-gradient(
      to top, rgba(3, 91, 143, 0), ${({ pallete }) => getColor(pallete)} 150%
    );
  }*/
`;

const HeadingStyled = styled.div<{ pallete: string }>`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 375px;
  height: 130px;
  padding-top: 0;
  //background-color: var(--color-dark-blue);

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 50px;
    left: 0;
    width: 100%;
    height: 100px;
    background-image: linear-gradient(
      to top, rgba(3, 91, 143, 0), ${({ pallete }) => getColor(pallete)} 150%
    );
  }
`;

const FrameStyled = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 50%;
  width: 42px;
  height: 30px;
  transform: translateX(-50%);
`;

const menuButtonStyle = css`
  position: fixed;
  z-index: 3;
  top: 14px;
  left: 0;
  margin: 0;
`;

export const Window: React.FC<WindowProps> = ({
  title,
  primary = false,
  pallete = 'default',
  children,
  onPrevious,
}) => {
  const [menuVisible, setVisible] = useState(false);

  const handleBackClick = isNil(onPrevious) ? gotoBack : onPrevious;
  const handleMenuClick = () => setVisible(true);
  const handleCancelClick = () => setVisible(false);

  return (
    <ContainerStyled pallete={pallete} primary={primary}>
      { primary && (
        <Button
          variant="icon"
          icon={MenuIcon}
          className={menuButtonStyle}
          onClick={handleMenuClick}
        />
      )}
      {menuVisible && <Menu onCancel={handleCancelClick} />}
      {children}
      {!primary && <LogoBottom />}
    </ContainerStyled>
  );
};
export default Window;
