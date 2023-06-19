import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppHeader/>
        <Routes>
          <Route path='/'>
            <Route index element={<Homepage />} />
          </Route >
        </Routes>
      <AppFooter />
    </BrowserRouter>
  );
}

export default App;
