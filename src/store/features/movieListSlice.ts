import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import { toggleModal } from './modalSlice';

export type Movie = {
  id: number;
  title: string;
  tagline: string;
  vote_average: number | string;
  vote_count: number | string;
  release_date: string;
  poster_path: string;
  overview: string;
  budget: number | string;
  revenue: number | string;
  genres: string[];
  runtime: number | string;
};

export const genreFilters = [
  '',
  'Documentary',
  'Comedy',
  'Horror',
  'Crime',
] as const;
export const sortTypes = ['release_date', 'vote_average'] as const;
export const searchTypes = ['title', 'genres'] as const;
export const orderTypes = ['desc', 'asc'] as const;

export type GenreFilters = typeof genreFilters[number];
export type SortTypes = typeof sortTypes[number];
export type SearchTypes = typeof searchTypes[number];
export type OrderTypes = typeof orderTypes[number];

type FetchOptions = {
  sortBy: SortTypes;
  sortOrder: OrderTypes;
  search?: string;
  searchBy?: SearchTypes;
  filter: GenreFilters[];
  offset: number;
  limit: number;
};

export type MovieWithoutId = Omit<Movie, 'id'>;

type MovieListData = {
  data: Movie[];
  total: number;
  fetchOptions: FetchOptions;
};

export const defaultMovieListData: MovieListData = {
  data: [],
  total: 0,
  fetchOptions: {
    sortBy: sortTypes[0],
    sortOrder: orderTypes[0],
    filter: [''],
    offset: 0,
    limit: 9,
  },
};

export type Error = {
  messages: string[];
};

type MovieListState = {
  loading: boolean;
  error: Error | null;
  data: MovieListData;
};

const defaultState: MovieListState = {
  loading: false,
  error: null,
  data: defaultMovieListData,
};

type ServerMovieListData = {
  data: Movie[];
  total: number;
  offset: number;
  limit: number;
};

export const fetchMovieList = createAsyncThunk<ServerMovieListData, undefined>(
  'movieList/fetchMovieList',
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;

    const fetchOptions = state.movieList.data.fetchOptions;

    let queryString = '';
    if (fetchOptions) {
      Object.entries(fetchOptions).forEach(([key, val]) => {
        if (key === 'filter')
          queryString += `${key}=${(val as string[]).join(',')}&`;
        else queryString += `${key}=${val}&`;
      });
      queryString.substring(queryString.length - 1);
    }

    console.log(queryString);

    const response = await fetch(`http://localhost:4000/movies?${queryString}`);

    return await response.json();
  }
);

export const addMovie = createAsyncThunk<
  void,
  MovieWithoutId,
  {
    extra: {
      jwt: string;
    };
    rejectValue: Error;
  }
>('movieList/addMovie', async (movie, thunkApi) => {
  const response = await fetch(`http://localhost:4000/movies`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${thunkApi.extra.jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });

  console.log(thunkApi.extra.jwt);

  if (response.status === 400) {
    return thunkApi.rejectWithValue(await response.json());
  }

  thunkApi.dispatch(fetchMovieList());
  thunkApi.dispatch(toggleModal('info'));
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
    headers: {
      Authorization: `Bearer ${thunkApi.extra.jwt}`,
      'Content-Type': 'application/json',
    },
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
  number,
  {
    extra: {
      jwt: string;
    };
    rejectValue: Error;
  }
>('movieList/deleteMovie', async (id, thunkApi) => {
  const response = await fetch(`http://localhost:4000/movies/${id}`, {
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
  reducers: {
    changeSortBy: (state, { payload }: { payload: SortTypes }) => {
      state.data.fetchOptions.sortBy = payload;
    },
    changeSortOrder: (state, { payload }: { payload: OrderTypes }) => {
      state.data.fetchOptions.sortOrder = payload;
    },
    changeFilter: (state, { payload }: { payload: GenreFilters[] }) => {
      state.data.fetchOptions.filter = payload;
    },
  },
  extraReducers: {
    [fetchMovieList.pending.type]: state => {
      state.loading = true;
    },
    [fetchMovieList.fulfilled.type]: (
      state,
      { payload }: { payload: ServerMovieListData }
    ) => {
      state.loading = false;
      state.data.data = payload.data;
      state.data.total = payload.total;
      state.data.fetchOptions.offset = payload.offset;
      state.data.fetchOptions.limit = payload.limit;
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

export const { changeSortBy, changeSortOrder, changeFilter } =
  movieListSlice.actions;
export default movieListSlice.reducer;
