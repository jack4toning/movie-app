import React from 'react';
import styled from 'styled-components';
import closeButton from '../../assets/images/closeButton.svg';
import useGlobalState from '../../hooks/useGlobalState';

export const CloseButton = ({ position }: { position: number }) => {
  const { setModalOpen } = useGlobalState();

  return (
    <SCCloseButton
      position={position}
      onClick={() => {
        setModalOpen(false);
      }}
    />
  );
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
