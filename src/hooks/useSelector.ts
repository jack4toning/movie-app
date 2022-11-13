import { useContext } from 'react';
import { ModalStateContext } from '../context';

type stateTypes = {
  modal: string;
};

type selectFn = (stateTypes: stateTypes) => stateTypes[keyof stateTypes];

const state: stateTypes = {
  modal: 'modal',
};

const useSelector = (selectFn: selectFn) => {
  const stateType = selectFn(state);
  const modalStateContext = useContext(ModalStateContext);
  if (stateType === 'modal') return modalStateContext;
  else throw new Error('Bad state type!');
};

export default useSelector;
