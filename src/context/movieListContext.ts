import { createContext, Dispatch } from 'react';
import { initialState, MovieListAction } from '../hooks/useMovieList';

const MovieListStateContext = createContext(initialState);
const MovieListDispatchContext = createContext(
  (() => {}) as Dispatch<MovieListAction>
);

export { MovieListStateContext, MovieListDispatchContext };
