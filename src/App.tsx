import React from 'react';
import './App.css';
import { Home } from './pages';
import useModal from './hooks/useModal';
import {
  ModalStateContext,
  ModalDispatchContext,
  SortOrderStateContext,
  SortOrderDispatchContext,
} from './context';
import useSortOrder from './hooks/useSortOrder';

function App() {
  const { modalState, dispatch: modalDispatch } = useModal();
  const { sortOrderState, dispatch: sortOrderDispatch } = useSortOrder();

  return (
    <ModalStateContext.Provider value={modalState}>
      <ModalDispatchContext.Provider value={modalDispatch}>
        <SortOrderStateContext.Provider value={sortOrderState}>
          <SortOrderDispatchContext.Provider value={sortOrderDispatch}>
            <div className='App'>
              <Home />
            </div>
          </SortOrderDispatchContext.Provider>
        </SortOrderStateContext.Provider>
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

export default App;
