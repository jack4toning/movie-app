import { useReducer } from 'react';

type OrderTypes = 'asc' | 'desc';

type SortOrderState = {
  sortOrder: OrderTypes;
};

export const initialState: SortOrderState = {
  sortOrder: 'desc',
};

export type SortOrderAction = { type: 'orderByAsc' } | { type: 'orderByDesc' };

const useSortOrder = () => {
  const sortOrderReducer = (
    prevState: SortOrderState,
    action: SortOrderAction
  ): SortOrderState => {
    switch (action.type) {
      case 'orderByAsc':
        return {
          sortOrder: 'asc',
        };
      case 'orderByDesc':
        return {
          sortOrder: 'desc',
        };
      default:
        throw new Error('Bad action!');
    }
  };

  const [sortOrderState, dispatch] = useReducer(sortOrderReducer, initialState);
  return { sortOrderState, dispatch };
};

export default useSortOrder;
