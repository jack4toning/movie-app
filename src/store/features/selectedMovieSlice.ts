import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type Movie = {
  id: number;
  title: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  poster_path: string;
  overview: string;
  budget: number;
  revenue: number;
  genres: string[];
  runtime: number;
};

type Error = {
  messages: string[];
};

type MovieState = {
  loading: boolean;
  error: Error | null;
  data: null;
};

export const defaultState: MovieState = {
  loading: false,
  error: null,
  data: null,
};

export const fetchMovie = createAsyncThunk<
  Movie,
  string,
  {
    extra: {
      jwt: string;
    };
    rejectValue: Error;
  }
>('movie/fetchMovie', async (id, thunkApi) => {
  const response = await fetch(`http://localhost:4000/movies?id=${id}`);

  if (response.status === 404) {
    return thunkApi.rejectWithValue({ messages: ['404 not found'] });
  }

  return await response.json();
});

export const selectedMovieSlice = createSlice({
  name: 'selectedMovie',
  initialState: defaultState,
  reducers: {
    clearSelectedMovie: state => {
      state.data = null;
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

export const { clearSelectedMovie } = selectedMovieSlice.actions;
export default selectedMovieSlice.reducer;
