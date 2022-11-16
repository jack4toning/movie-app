import { useContext } from 'react';
import { MovieListDispatchContext, ModalDispatchContext } from '../context';

type dispatchTypes = {
  modal: string;
  movieList: string;
};

type selectFn = (
  dispatches: dispatchTypes
) => dispatchTypes[keyof dispatchTypes];

const dispatches: dispatchTypes = {
  modal: 'modal',
  movieList: 'movieList',
};

const useDispatch = (selectFn: selectFn) => {
  const dispatchType = selectFn(dispatches);
  const modalDispatch = useContext(ModalDispatchContext);
  const movieListDispatch = useContext(MovieListDispatchContext);
  if (dispatchType === 'modal') return modalDispatch;
  else if (dispatchType === 'movieList') return movieListDispatch;
  else throw new Error('Bad selector!');
};

export default useDispatch;
