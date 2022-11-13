import React from 'react';
import './App.css';
import { Home } from './pages';
import useModal from './hooks/useModal';
import { ModalStateContext, ModalDispatchContext } from './context';

function App() {
  const { modalState, dispatch } = useModal();

  return (
    <ModalStateContext.Provider value={modalState}>
      <ModalDispatchContext.Provider value={dispatch}>
        <div className='App'>
          <Home />
        </div>
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

export default App;
