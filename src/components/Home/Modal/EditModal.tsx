import React from 'react';
import ModalContainer from './ModalContainer';
import ModalForm from './ModalForm';

export function EditModal() {
  return (
    <ModalContainer>
      <ModalForm formTitle={'edit movie'} type={'edit'} />
    </ModalContainer>
  );
}
