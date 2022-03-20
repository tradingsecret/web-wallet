import React from 'react';
import { styled } from '@linaria/react';

interface BackButtonProps {
  className?: string;
  onClick: React.MouseEventHandler;
}

const BackButtonStyled = styled.div`
  width: 22px;
  height: 38px;
  position: absolute;
  top: 25px;
  left: 15px;
  cursor: pointer;
  z-index: 1;
  background: url("/assets/buttons/arrows/back_btn_default.png");

  :hover {
    background: url("/assets/buttons/arrows/back_btn_hover.png");
  }
`;

const BackButton: React.FC<BackButtonProps> = ({ className, onClick }) => (
  <BackButtonStyled className={className} onClick={onClick} />
);

export default BackButton;
