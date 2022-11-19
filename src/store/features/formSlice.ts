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
    fill: (state, action) => {
      state = action.payload;
    },
    clear: state => {
      state = defaultForm;
    },
  },
});

export const { fill, clear } = formSlice.actions;
export default formSlice.reducer;
