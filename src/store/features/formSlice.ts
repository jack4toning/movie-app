import { createSlice } from '@reduxjs/toolkit';

export const defaultForm: Form = {
  id: -1,
  title: '',
  releaseDate: '',
  movieUrl: '',
  rating: -1,
  genres: [],
  runtime: -1,
  overview: '',
};

type Form = {
  id: number;
  title: string;
  releaseDate: string;
  movieUrl: string;
  rating: number;
  genres: string[];
  runtime: number;
  overview: string;
};

export const formSlice = createSlice({
  name: 'modal/form',
  initialState: defaultForm,
  reducers: {
    fillForm: (state, action) => {
      state = action.payload;
    },
    clearForm: state => {
      state = defaultForm;
    },
  },
});

export const { fillForm, clearForm } = formSlice.actions;
export default formSlice.reducer;
