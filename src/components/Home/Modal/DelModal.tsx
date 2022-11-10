import React from 'react';
import ModalContainer from './ModalContainer';
import styled from 'styled-components';
import { CloseButton } from '../../Common';

export function DelModal() {
  return (
    <ModalContainer>
      <Modal>
        <CloseButton position={26} />
        <Title>Delete Movie</Title>
        <Reminder>Are you sure you want to delete this movie?</Reminder>
        <ConfirmButton>Confirm</ConfirmButton>
      </Modal>
    </ModalContainer>
  );
}

const Modal = styled.div`
  position: relative;
  width: 686px;
  height: 352px;
  background: #232323;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.07),
    0px 10px 20px rgba(0, 0, 0, 0.05), 0px 10px 50px rgba(0, 0, 0, 0.05);
  margin: 123px auto;
  overflow: hidden;
`;

const Title = styled.div`
  font-weight: 300;
  font-size: 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 63px 0 37px 82px;
`;

const Reminder = styled.div`
  font-size: 20px;
  margin: 0 0 52px 82px;
`;

const ConfirmButton = styled.div`
  width: 180px;
  height: 57px;
  line-height: 57px;
  text-align: center;
  background: #f65261;
  border-radius: 4px;
  margin-left: 424px;
  text-transform: uppercase;
  cursor: pointer;
`;
