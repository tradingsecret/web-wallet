import { styled } from '@linaria/react';

export const Wrapper = styled.div`
  padding: 0 30px;
`;

export const Title = styled.div`
  padding-top: 40px;
  font-family: "agency",serif;
  font-weight: bold;
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

export const Back = styled.button`
  background-image: url('/assets/buttons/common/back/default.png');
  background-repeat: no-repeat;
  background-position-x: center;
  width: 162px;
  height: 45px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  
  &:hover {
    border: 0;
    background-image: url('/assets/buttons/common/back/hover.png');
  }
`;

export const Next = styled.button`
  background-image: url('/assets/buttons/common/next/default.png');
  background-repeat: no-repeat;
  background-position-x: center;
  width: 162px;
  height: 45px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  
  &:hover {
    border: 0;
    background-image: url('/assets/buttons/common/next/hover.png');
  }
`;
