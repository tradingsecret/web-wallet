import React, { useState } from 'react';

import { setView, View } from '@app/model/view';
import { styled } from '@linaria/react';
import RemovePopup from '@pages/main/settings/RemovePopup';

const ContainerStyled = styled.div`
  z-index: 1;
  position: absolute;
  width: 400px;
  height: 121px;
  top: 41px;
  background: url("/assets/wallet/menu/menu_bg.png");
`;

const ButtonDelete = styled.div`
  height: 59px;
  font-size: 20px;
  color: #757575;
  font-family: "agency",serif;
  font-weight: bold;
  letter-spacing: 1px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;

  :hover {
    color: #fff;
  }

  span {
    display: flex;
    align-items: center;
  }
`;

const ButtonWriteUs = styled.div`
  height: 59px;
  background: url("/assets/wallet/menu/hover_button.png");
  font-size: 20px;
  color: #757575;
  font-family: "agency",serif;
  font-weight: bold;
  letter-spacing: 1px;
  justify-content: center;
  display: flex;
  cursor: pointer;
  
  :hover {
    color: #fff;
  }

  span {
    display: flex;
    align-items: center;
  }
`;

interface MenuProps {
  onCancel?: React.MouseEventHandler,
}

const Menu: React.FC<MenuProps> = () => {
  const [warningVisible, toggleWarning] = useState(false);
  const ReportClicked = () => {
    setView(View.SETTINGS_REPORT);
  };

  return (
    <ContainerStyled>
      <ButtonDelete onClick={() => toggleWarning(true)}><span>DELETE CURRENT WALLET</span></ButtonDelete>
      <ButtonWriteUs onClick={ReportClicked}><span>WRITE US</span></ButtonWriteUs>
      <RemovePopup
        visible={warningVisible}
        onCancel={() => toggleWarning(false)}
      />
    </ContainerStyled>
  );
};

export default Menu;

