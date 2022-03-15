import React, { useState } from 'react';

import { Window } from 'app/uikit';
import { View, setView } from '@app/model/view';
import { styled } from '@linaria/react';
import { SendReport } from '@model/report';

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

const WriteAreaWrap = styled.div`
  width: 374px;
  height: 300px;
  margin: 0 auto;
  background: url("/assets/settings/report/textarea.png");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
`;

const TextareaWrap = styled.div`
    display: block;
    height: 100%;
    padding-top: 50px;
`;

const SuccessMessage = styled.div`
    color: green;
`;

const ErrorMessage = styled.div`
    color: red;
`;

const Textarea = styled.textarea`
    width: calc(100% - 100px);
    height: calc(100% - 115px);
    background: transparent;
    resize: none;
    border: none;
    color: #fff;

  /* width */
  ::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 10px;
  }
`;

const WriteSendButton = styled.button`
  position: absolute;
  bottom: 45px;
  left: 50%;
  transform: translateX(-50%);
  width: 162px;
  height: 45px;
  background-size: contain;
  border: 0;
  cursor: pointer;

  background: url("/assets/settings/report/send_btn_default.png");

  :hover {
    background: url("/assets/settings/report/send_btn_hover.png");
  }
`;

const WriteButton = styled.button`
  width: 342px;
  height: 45px;
  background-size: contain;
  border: 0;
  cursor: pointer;
  margin-top: 20px;

  background: url("/assets/settings/report/write_btn_default.png");

  :hover {
    background: url("/assets/settings/report/write_btn_hover.png");
  }
`;

const SettingsReport = () => {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handlePrevious: React.MouseEventHandler = () => {
    setView(View.SETTINGS);
  };

  const sendReport = async (): Promise<void> => {
    setSuccess(null);
    setError(null);
    // SendReport
    const response = await SendReport(message);

    if ('status' in response && response.status) {
      setMessage('');
      setSuccess('Message was sent successfully.');
    } else if ('errors' in response && response.errors.message) {
      setError(response.errors.message[0]);
    } else {
      setError('Something was wrong.');
    }
  };

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
      <WriteButton onClick={() => setShowForm(!showForm)} />
      {showForm
            && (
            <WriteAreaWrap>
              <TextareaWrap>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                {success && <SuccessMessage>{success}</SuccessMessage>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </TextareaWrap>
              <WriteSendButton onClick={sendReport} />
            </WriteAreaWrap>
            )}
    </Window>
  );
};

export default SettingsReport;
