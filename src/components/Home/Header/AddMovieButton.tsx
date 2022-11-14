import React, { Dispatch } from 'react';
import styled from 'styled-components';
import useDispatch from '../../../hooks/useDispatch';
import { ModalAction } from '../../../hooks/useModal';

export default function AddMovieButton() {
  const dispatch = useDispatch(
    dispatches => dispatches.modal
  ) as Dispatch<ModalAction>;

  return (
    <Button
      onClick={() => {
        dispatch({ type: 'openModal', payload: 'add' });
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
