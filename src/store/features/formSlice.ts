import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Error, Movie } from './movieListSlice';

type FormState = {
  loading: boolean;
  error: Error | null;
  data: Movie;
};

export const defaultForm: FormState = {
  loading: false,
  error: null,
  data: {
    id: -1,
    title: '',
    tagline: '',
    vote_average: -1,
    vote_count: -1,
    release_date: '',
    poster_path: '',
    overview: '',
    budget: -1,
    revenue: -1,
    genres: [],
    runtime: -1,
  },
};

export const fetchMovie = createAsyncThunk<
  Movie,
  number,
  {
    extra: {
      jwt: string;
    };
    rejectValue: Error;
  }
>('form/fetchMovie', async (id, thunkApi) => {
  const response = await fetch(`http://localhost:4000/movies/${id}`);

  if (response.status === 404) {
    return thunkApi.rejectWithValue({ messages: ['404 not found'] });
  }

  return await response.json();
});

export const formSlice = createSlice({
  name: 'form',
  initialState: defaultForm,
  reducers: {
    fillForm: (state, action) => {
      state = action.payload;
    },
    clearForm: state => {
      state = defaultForm;
    },
  },
  extraReducers: {
    [fetchMovie.pending.type]: state => {
      state.loading = true;
    },
    [fetchMovie.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [fetchMovie.rejected.type]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { fillForm, clearForm } = formSlice.actions;
export default formSlice.reducer;
