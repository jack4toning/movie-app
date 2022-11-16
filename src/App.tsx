import React from 'react';
import './App.css';
import { Home } from './pages';
import {
  ModalStateContext,
  ModalDispatchContext,
  MovieListStateContext,
  MovieListDispatchContext,
} from './context';
import useModal from './hooks/useModal';
import useMovieList from './hooks/useMovieList';

function App() {
  const { modalState, dispatch: modalDispatch } = useModal();
  const { movieListState, dispatch: movieListDispatch } = useMovieList();

  return (
    <ModalStateContext.Provider value={modalState}>
      <ModalDispatchContext.Provider value={modalDispatch}>
        <MovieListStateContext.Provider value={movieListState}>
          <MovieListDispatchContext.Provider value={movieListDispatch}>
            <div className='App'>
              <Home />
            </div>
          </MovieListDispatchContext.Provider>
        </MovieListStateContext.Provider>
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

export default App;
