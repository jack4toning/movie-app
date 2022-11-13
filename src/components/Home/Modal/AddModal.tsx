import React from 'react';
import ModalContainer from './ModalContainer';
import ModalForm from './ModalForm';

export function AddModal() {
  return (
    <ModalContainer>
      <ModalForm title={'add movie'} type={'add'} />
    </ModalContainer>
  );
}
