import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Error, Movie } from './movieListSlice';

type MovieState = {
  loading: boolean;
  error: Error | null;
  data: MovieData;
};

type MovieData = {
  movie: Movie | null;
  focusId: number;
};

const defaultMovieData = { movie: null, focusId: -1 };

export const defaultState: MovieState = {
  loading: false,
  error: null,
  data: defaultMovieData,
};

export const fetchMovieForSelect = createAsyncThunk<
  Movie,
  number,
  {
    extra: {
      jwt: string;
    };
    rejectValue: Error;
  }
>('movie/fetchMovieForSelect', async (id, thunkApi) => {
  const response = await fetch(`http://localhost:4000/movies/${id}`);

  if (response.status === 404) {
    return thunkApi.rejectWithValue({ messages: ['404 not found'] });
  }

  return await response.json();
});

export const selectedMovieSlice = createSlice({
  name: 'selectedMovie',
  initialState: defaultState,
  reducers: {
    selectMovie: (state, action) => {
      state.data.focusId = action.payload;
    },
    clearSelectedMovie: state => {
      state.data = defaultMovieData;
    },
  },
  extraReducers: {
    [fetchMovieForSelect.pending.type]: state => {
      state.loading = true;
    },
    [fetchMovieForSelect.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.data.movie = payload;
    },
    [fetchMovieForSelect.rejected.type]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { selectMovie, clearSelectedMovie } = selectedMovieSlice.actions;
export default selectedMovieSlice.reducer;
