import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import './App.css';
import Graduacao from './pages/graduacao';
import Mobilidade from './pages/mobilidade';
import Estrangeiros from './pages/estrangeiros';
import Informacoes from './pages/informacoes';
import Convenios from './pages/convenios';

function App() {
  return (
    <BrowserRouter>
      <AppHeader/>
        <Routes>
          <Route path='/'>
            <Route index element={<Homepage />} />
            <Route path='graduacao' element={<Graduacao />} />
            <Route path='mobilidade' element={<Mobilidade />} />
            <Route path='estrangeiros' element={<Estrangeiros />} />
            <Route path='convenios' element={<Convenios />} />
            <Route path='informacoes' element={<Informacoes />} />
          </Route >
        </Routes>
      <AppFooter />
    </BrowserRouter>
  );
}

export default App;
