import { useContext } from 'react';
import { ModalDispatchContext, SortOrderDispatchContext } from '../context';

type dispatchTypes = {
  modal: string;
  sortOrder: string;
};

type selectFn = (
  dispatches: dispatchTypes
) => dispatchTypes[keyof dispatchTypes];

const dispatches: dispatchTypes = {
  modal: 'modal',
  sortOrder: 'sortOrder',
};

const useDispatch = (selectFn: selectFn) => {
  const dispatchType = selectFn(dispatches);
  const modalDispatch = useContext(ModalDispatchContext);
  const sortOrderDispatch = useContext(SortOrderDispatchContext);
  if (dispatchType === 'modal') return modalDispatch;
  else if (dispatchType === 'sortOrder') return sortOrderDispatch;
  else throw new Error('Bad selector!');
};

export default useDispatch;
