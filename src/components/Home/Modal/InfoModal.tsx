import React from 'react';
import ModalContainer from './ModalContainer';
import styled from 'styled-components';
import crossIcon from '../../../assets/images/crossIcon.svg';
import { CloseButton } from '../../Common';

export function InfoModal() {
  return (
    <ModalContainer>
      <Modal>
        <CloseButton position={26} modalType={'info'} />
        <CrossWrapper />
        <Title>Congratulations!</Title>
        <Reminder>The movie has been added to database successfully</Reminder>
      </Modal>
    </ModalContainer>
  );
}

const Modal = styled.div`
  position: relative;
  width: 686px;
  height: 322px;
  background: #232323;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.07),
    0px 10px 20px rgba(0, 0, 0, 0.05), 0px 10px 50px rgba(0, 0, 0, 0.05);
  margin: 123px auto;
  overflow: hidden;
`;

const CrossWrapper = styled.div`
  width: 66px;
  height: 66px;
  background: #f65261;
  background-image: url(${crossIcon});
  background-size: 35px;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid #f65261;
  border-radius: 50%;
  margin: 42px auto;
`;

const Title = styled.div`
  font-weight: 300;
  font-size: 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 31px auto 29px auto;
  text-align: center;
`;

const Reminder = styled.div`
  font-size: 20px;
  width: 302px;
  text-align: center;
  margin: 0 auto;
`;
