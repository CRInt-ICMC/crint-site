import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage';
import AppHeader from './components/AppHeader';

function App() {
  return (
    <BrowserRouter>
      <AppHeader/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
