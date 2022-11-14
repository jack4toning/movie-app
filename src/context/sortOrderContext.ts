import { createContext, Dispatch } from 'react';
import { initialState, SortOrderAction } from '../hooks/useSortOrder';

const SortOrderStateContext = createContext(initialState);
const SortOrderDispatchContext = createContext(
  (() => {}) as Dispatch<SortOrderAction>
);

export { SortOrderStateContext, SortOrderDispatchContext };
