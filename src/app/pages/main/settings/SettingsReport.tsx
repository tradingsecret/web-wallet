import React from 'react';

import { Window } from 'app/uikit';
import { View, setView } from '@app/model/view';
import { useStore } from 'effector-react';
import { styled } from '@linaria/react';
import * as extensionizer from 'extensionizer';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { $logs } from './model';

const Title = styled.div`
  font-family: "agency",serif;
  font-weight: bold;
  font-size: 32px;
  padding-top: 40px;
  color: #fff;
  letter-spacing: 1px;
`;

const SubTitle = styled.div`
  font-family: "tomorrow",serif;
  font-weight: normal;
  font-size: 13px;
  padding: 50px 30px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Email = styled.a`
  color: #5e5cb3;
  text-decoration: underline;
`;

const WriteButtonWrapper = styled.div`
  padding-top: 15px;
`;

const WriteButton = styled.button`
  width: 342px;
  height: 45px;
  background-size: contain;
  border: 0;
  cursor: pointer;

  background: url("/assets/settings/report/write_btn_default.png");

  :hover {
    background: url("/assets/settings/report/write_btn_hover.png");
  }
`;

const SettingsReport = () => {
  // const logs = useStore($logs);

  const handlePrevious: React.MouseEventHandler = () => {
    setView(View.SETTINGS);
  };

  /*
  const mailClicked = () => {
    const mailText = 'mailto:support@beam.mw';
    window.location.href = mailText;
  };

  const githubClicked = () => {
    window.open('https://github.com/BeamMW/web-wallet/issues', '_blank');
  };

  const saveLogsclicked = () => {
    const { version } = extensionizer.runtime.getManifest();
    const zip = new JSZip();
    const finalLogs = logs.common.concat(logs.errors).concat(logs.warns);

    zip.file('logs.log', finalLogs.join('\n'));
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, `beam-web-wallet-${version}-report.zip`);
    });

    setView(View.SETTINGS);
  }; */

  return (
    <Window onPrevious={handlePrevious}>
      <Title>FOUND A BUG?</Title>
      <SubTitle>
        If you found bugs or faced any other problems
        with the testnet wallet, please
        contact us:
        {' '}
        <Email href="mailto:support@imperiumprotocol.com">support@imperiumprotocol.com</Email>
      </SubTitle>
      <WriteButtonWrapper>
        <WriteButton />
      </WriteButtonWrapper>
    </Window>
  );
};

export default SettingsReport;

/**
 * <ReportStyled>
 *         <p>To report a problem:</p>
 *         <p>1. Click “Save wallet logs” and choose</p>
 *         <p>a destination folder for log archive.</p>
 *         <p>2. Send email to
 *             <LinkStyled onClick={() => mailClicked()}>support@beam.mw</LinkStyled>
 *             or open a ticket in
 *             <LinkStyled onClick={() => githubClicked()}>Github</LinkStyled>.</p>
 *         <p>3. Don’t forget to attach logs archive.</p>
 *       </ReportStyled>
 *       <Button
 *           type="button"
 *           icon={SaveIcon}
 *           onClick={() => saveLogsclicked()}
 *         >
 *           save wallet logs
 *         </Button>
 */
