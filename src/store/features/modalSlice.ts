import { createSlice } from '@reduxjs/toolkit';

export const defaultModal: Modal = {
  addToggle: false,
  editToggle: false,
  delToggle: false,
  infoToggle: false,
};

type Modal = {
  addToggle: boolean;
  editToggle: boolean;
  delToggle: boolean;
  infoToggle: boolean;
};

type ModalTypes = 'add' | 'edit' | 'del' | 'info';
type Action = {
  type: string;
  payload: ModalTypes;
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: defaultModal,
  reducers: {
    toggleForm: (state, action: Action) => {
      state[`${action.payload}Toggle`] = !state[`${action.payload}Toggle`];
    },
  },
});

export const { toggleForm } = modalSlice.actions;
export default modalSlice.reducer;
