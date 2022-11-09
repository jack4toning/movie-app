import React from 'react';
import './App.css';
import { Home } from './pages';
import useModal from './hooks/useModal';
import Context from './context';

function App() {
  const { modalOpen, setModalOpen } = useModal();

  return (
    <Context.Provider value={{ modalOpen, setModalOpen }}>
      <div className='App'>
        <Home />
      </div>
    </Context.Provider>
  );
}

export default App;
