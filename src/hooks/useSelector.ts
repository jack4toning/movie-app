import { useContext } from 'react';
import { ModalStateContext, SortOrderStateContext } from '../context';

type stateTypes = {
  modal: string;
  sortOrder: string;
};

type selectFn = (stateTypes: stateTypes) => stateTypes[keyof stateTypes];

const state: stateTypes = {
  modal: 'modal',
  sortOrder: 'sortOrder',
};

const useSelector = (selectFn: selectFn) => {
  const stateType = selectFn(state);
  const modalState = useContext(ModalStateContext);
  const sortOrderState = useContext(SortOrderStateContext);
  if (stateType === 'modal') return modalState;
  else if (stateType === 'sortOrder') return sortOrderState;
  else throw new Error('Bad state type!');
};

export default useSelector;
