import React from 'react';
import styled from 'styled-components';
import closeButton from '../../../assets/images/closeButton.svg';
import { clearForm } from '../../../store/features/formSlice';
import { toggleModal } from '../../../store/features/modalSlice';
import { useDispatch } from '../../../store/hooks';

export const CloseButton = ({
  position,
  modalType,
}: {
  position: number;
  modalType: 'add' | 'edit' | 'del' | 'info';
}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleModal(modalType));
    dispatch(clearForm());
  };

  return <SCCloseButton position={position} onClick={handleClose} />;
};

const SCCloseButton = styled.div`
  width: 21px;
  height: 21px;
  background-image: url(${closeButton});
  background-size: cover;
  position: absolute;
  right: ${({ position }: { position: number }) => position + 'px'};
  top: ${({ position }: { position: number }) => position + 'px'};
  cursor: pointer;
`;
