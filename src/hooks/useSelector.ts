import { useContext } from 'react';
import { ModalStateContext, MovieListStateContext } from '../context';

type stateTypes = {
  modal: string;
  movieList: string;
};

type selectFn = (stateTypes: stateTypes) => stateTypes[keyof stateTypes];

const state: stateTypes = {
  modal: 'modal',
  movieList: 'movieList',
};

const useSelector = (selectFn: selectFn) => {
  const stateType = selectFn(state);
  const modalState = useContext(ModalStateContext);
  const movieListState = useContext(MovieListStateContext);
  if (stateType === 'modal') return modalState;
  else if (stateType === 'movieList') return movieListState;
  else throw new Error('Bad state type!');
};

export default useSelector;
