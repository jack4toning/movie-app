import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './features/modalSlice';
import formReducer from './features/formSlice';
import movieListReducer from './features/movieListSlice';
import selectedMovieReducer from './features/selectedMovieSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    form: formReducer,
    movieList: movieListReducer,
    selectedMovie: selectedMovieReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: { extraArgument: { jwt: 'test_jwt' } } }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
