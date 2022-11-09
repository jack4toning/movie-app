import { useContext } from 'react';
import Context from '../context';

const useGlobalState = () => {
  return useContext(Context);
};

export default useGlobalState;
