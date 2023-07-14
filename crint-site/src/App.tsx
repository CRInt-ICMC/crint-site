import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Mobilidade from './pages/mobilidade';
import Estrangeiros from './pages/estrangeiros';
import Informacoes from './pages/informacoes';
import Convenios from './pages/convenios';
import './App.css';
// import VLibras from '@djpfs/react-vlibras/dist/types';
import { useState } from 'react';
import { LangDictContext, STD_LANGUAGE_DICTIONARY, LangDictState, STD_LANGUAGE_STATE, setLangDict } from './Contexts';

function App() {
  const [appLangDict, setAppLangDict] = useState(STD_LANGUAGE_STATE);

  return (
    <BrowserRouter>
      <AppHeader/>
        {/* <VLibras /> */}
        {/* <LangDictContext.Provider 
          value={{LangDictState: appLangDict, 
            setLangDict: setAppLangDict}}
          > */}
        <Routes>
          <Route path='/'>
            <Route index element={<Homepage />} />
            <Route path='mobilidade' element={<Mobilidade />} />
            
            <Route path='estrangeiros' element={<Estrangeiros />} />

            <Route path='informacoes' element={<Informacoes />} />
            <Route path='informacoes/convenios' element={<Convenios />} />
          </Route >
        </Routes>
        {/* </LangDictContext.Provider> */}
      <AppFooter />
    </BrowserRouter>
  );
}

export default App;
