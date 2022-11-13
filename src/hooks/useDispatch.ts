import { useContext } from 'react';
import { ModalDispatchContext } from '../context';

const useDispatch = () => {
  return useContext(ModalDispatchContext);
};

export default useDispatch;
