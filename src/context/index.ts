import { createContext, Dispatch } from 'react';
import { initialState, ModalAction } from '../hooks/useModal';

const ModalStateContext = createContext(initialState);
const ModalDispatchContext = createContext((() => {}) as Dispatch<ModalAction>);

export { ModalStateContext, ModalDispatchContext };
