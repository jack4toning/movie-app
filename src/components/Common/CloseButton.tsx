import React, { Dispatch } from 'react';
import styled from 'styled-components';
import closeButton from '../../assets/images/closeButton.svg';
import useDispatch from '../../hooks/useDispatch';
import { ModalAction } from '../../hooks/useModal';

export const CloseButton = ({
  position,
  modalType,
}: {
  position: number;
  modalType: 'add' | 'edit' | 'del' | 'info';
}) => {
  const dispatch = useDispatch(
    dispatches => dispatches.modal
  ) as Dispatch<ModalAction>;

  const handleClick = () => {
    dispatch({ type: 'closeModal', payload: modalType });
    dispatch({ type: 'clearModalForm' });
  };

  return <SCCloseButton position={position} onClick={handleClick} />;
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
