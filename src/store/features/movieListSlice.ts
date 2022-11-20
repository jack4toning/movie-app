import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Movie } from './selectedMovieSlice';

type MovieList = {
  totalAmount: number;
  data: Movie[];
  offset: number;
  limit: number;
};

export const defaultMovieList: MovieList = {
  totalAmount: 0,
  data: [],
  offset: 0,
  limit: 10,
};

type Error = {
  messages: string[];
};

type MovieListState = {
  loading: boolean;
  error: Error | null;
  data: MovieList;
};

const defaultState: MovieListState = {
  loading: false,
  error: null,
  data: defaultMovieList,
};

export const genreFilters = [
  'All',
  'Documentary',
  'Comedy',
  'Horror',
  'Crime',
] as const;
export const sortTypes = ['Release date', 'Rating'] as const;
export const searchTypes = ['title', 'genres'] as const;
export const orderTypes = ['desc', 'asc'] as const;

export type GenreFilters = typeof genreFilters[number];
export type SortTypes = typeof sortTypes[number];
export type SearchTypes = typeof searchTypes[number];
export type OrderTypes = typeof orderTypes[number];

type FetchOptions = {
  sortBy?: SortTypes;
  sortOrder?: OrderTypes;
  search?: string;
  searchBy?: SearchTypes;
  filter?: GenreFilters[];
  offset?: number;
  limit?: number;
};

export const fetchMovieList = createAsyncThunk<
  MovieList,
  FetchOptions | undefined
>('movieList/fetchMovieList', async fetchOptions => {
  let queryString = '';
  if (fetchOptions) {
    Object.entries(fetchOptions).forEach(([key, val]) => {
      queryString += `${key}=${val}&`;
    });
    queryString.substring(queryString.length - 1);
  }

  const response = await fetch(`http://localhost:4000/movies?${queryString}`);

  return await response.json();
});

export const addMovie = createAsyncThunk<
  void,
  Movie,
  {
    extra: {
      jwt: string;
    };
    rejectValue: Error;
  }
>('movieList/addMovie', async (movie: Movie, thunkApi) => {
  const response = await fetch(`http://localhost:4000/movies`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${thunkApi.extra.jwt}` },
    body: JSON.stringify(movie),
  });

  console.log(thunkApi.extra.jwt);

  if (response.status === 400) {
    return thunkApi.rejectWithValue(await response.json());
  }

  thunkApi.dispatch(fetchMovieList());
});

export const editMovie = createAsyncThunk<
  void,
  Movie,
  {
    extra: {
      jwt: string;
    };
    rejectValue: Error;
  }
>('movieList/editMovie', async (movie: Movie, thunkApi) => {
  const response = await fetch(`http://localhost:4000/movies`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${thunkApi.extra.jwt}` },
    body: JSON.stringify(movie),
  });

  console.log(thunkApi.extra.jwt);

  if (response.status === 400) {
    return thunkApi.rejectWithValue(await response.json());
  }

  if (response.status === 404) {
    return thunkApi.rejectWithValue({ messages: ['404 not found'] });
  }

  thunkApi.dispatch(fetchMovieList());
});

export const deleteMovie = createAsyncThunk<
  void,
  string,
  {
    extra: {
      jwt: string;
    };
    rejectValue: Error;
  }
>('movieList/deleteMovie', async (id, thunkApi) => {
  const response = await fetch(`http://localhost:4000/movies?id=${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${thunkApi.extra.jwt}` },
  });

  console.log(thunkApi.extra.jwt);

  if (response.status === 404) {
    return thunkApi.rejectWithValue({ messages: ['404 not found'] });
  }

  thunkApi.dispatch(fetchMovieList());
});

export const movieListSlice = createSlice({
  name: 'movieList',
  initialState: defaultState,
  reducers: {},
  extraReducers: {
    [fetchMovieList.pending.type]: state => {
      state.loading = true;
    },
    [fetchMovieList.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [addMovie.pending.type]: state => {
      state.loading = true;
    },
    [addMovie.rejected.type]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [editMovie.pending.type]: state => {
      state.loading = true;
    },
    [editMovie.rejected.type]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteMovie.pending.type]: state => {
      state.loading = true;
    },
    [deleteMovie.rejected.type]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

// export const {} = movieListSlice.actions;
export default movieListSlice.reducer;
