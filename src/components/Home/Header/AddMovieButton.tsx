import React from 'react';
import styled from 'styled-components';
import useGlobalState from '../../../hooks/useGlobalState';

export default function AddMovieButton() {
  const { setModalState } = useGlobalState();

  return (
    <Button
      onClick={() => {
        setModalState(prev => ({ ...prev, addModalOpen: true }));
      }}>
      + ADD MOVIE
    </Button>
  );
}

const Button = styled.div`
  position: absolute;
  right: 56px;
  top: 20px;
  width: 177px;
  height: 46px;
  line-height: 46px;
  background: rgba(96, 96, 96, 0.68);
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  color: #f65261;
  cursor: pointer;

  :hover {
    background: rgba(96, 96, 96, 0.78);
  }
`;
