import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from 'react-redux';
import { RootState, AppDispatch } from '.';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch: () => AppDispatch = useReduxDispatch;
