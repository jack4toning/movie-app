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
    vote_average: '',
    vote_count: 0,
    release_date: '',
    poster_path: '',
    overview: '',
    budget: 0,
    revenue: 0,
    genres: [],
    runtime: '',
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
    clearForm: state => {
      state.data = defaultForm.data;
    },
    changeTitle: (state, action) => {
      state.data.title = action.payload;
    },
    changeReleaseDate: (state, action) => {
      state.data.release_date = action.payload;
    },
    changePosterPath: (state, action) => {
      state.data.poster_path = action.payload;
    },
    changeVoteAverage: (state, action) => {
      state.data.vote_average = action.payload;
    },
    changeGenres: (state, action) => {
      state.data.genres = action.payload;
    },
    changeRuntime: (state, action) => {
      state.data.runtime = action.payload;
    },
    changeOverview: (state, action) => {
      state.data.overview = action.payload;
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

export const {
  clearForm,
  changeTitle,
  changeReleaseDate,
  changePosterPath,
  changeGenres,
  changeVoteAverage,
  changeOverview,
  changeRuntime,
} = formSlice.actions;
export default formSlice.reducer;
