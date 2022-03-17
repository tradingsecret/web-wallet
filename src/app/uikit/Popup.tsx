import React from 'react';
import { styled } from '@linaria/react';

import { CancelIcon } from '@app/icons';

import Backdrop from './Backdrop';
import Button from './Button';

interface PopupProps {
  title?: string;
  cancelButton?: React.ReactElement;
  confirmButton?: React.ReactElement;
  visible?: boolean;
  onCancel?: React.MouseEventHandler;
}

const ContainerStyled = styled.div`
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  border-radius: 10px;
  background: url("/assets/popups/popup.png");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
  color: white;
`;

const ContainerStyledWrapper = styled.div`
  padding: 60px;
`;

const TitleStyled = styled.h2`
  font-size: 16px;
  margin: 0;
  margin-bottom: 20px;
`;

const FooterStyled = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 -7px;
  margin-top: 20px;

  > button {
    margin: 0 7px !important;
  }
`;

export const ConfirmButton = styled.button`
  background-image: url('/assets/popups/ok_button_default.png');
  background-repeat: no-repeat;
  background-position-x: center;
  width: 162px;
  height: 45px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  
  &:hover {
    border: 0;
    background-image: url('/assets/popups/ok_button_hover.png');
  }
`;

const Popup: React.FC<PopupProps> = ({
  title,
  visible,
  onCancel,
  cancelButton = (
    <Button
      variant="ghost"
      icon={CancelIcon}
      onClick={onCancel}
    >
      cancel
    </Button>
  ),
  confirmButton,
  children,
}) => (visible ? (
  <Backdrop onCancel={onCancel}>
    <ContainerStyled>
      <ContainerStyledWrapper>
        <TitleStyled>{title}</TitleStyled>
        {children}
        <FooterStyled>
          {confirmButton}
        </FooterStyled>
      </ContainerStyledWrapper>
    </ContainerStyled>
  </Backdrop>
) : null);

export default Popup;
