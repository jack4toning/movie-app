import React from 'react';
import './App.css';
import { Home } from './pages';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Navigate to={'/search'} />} />
          <Route path='/search' element={<Home />} />
          <Route path='/search/:searchQuery' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
