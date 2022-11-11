import React from 'react';
import './App.css';
import { Home } from './pages';
import useModal from './hooks/useModal';
import Context from './context';

function App() {
  const { modalState, setModalState } = useModal();

  return (
    <Context.Provider value={{ modalState, setModalState }}>
      <div className='App'>
        <Home />
      </div>
    </Context.Provider>
  );
}

export default App;
