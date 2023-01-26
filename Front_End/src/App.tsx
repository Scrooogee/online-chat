import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Auth from './Pages/Auth';

import './scss/app.scss'
import Home from './Pages/Home';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  return (
      <Routes>
          <Route path='/' element={<Auth/>}/>
          <Route path='/home' element={<Home/>}/>
      </Routes>
  );
};

export default App;
