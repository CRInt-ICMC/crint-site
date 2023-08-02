import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

import Mobilidade from './pages/mobilidade';
import Aluno from './pages/mobility subpages/aluno';
import Professor from './pages/mobility subpages/professor';
import Servidor from './pages/mobility subpages/servidor';

import Estrangeiros from './pages/estrangeiros';
import Guias from './pages/foreigners subpages/guias';

import Informacoes from './pages/informacoes';
import Convenios from './pages/information subpages/convenios';
import Dia from './pages/information subpages/dia';
import Pesquisa from './pages/information subpages/pesquisa';

import { WIP } from './utils/appImages';
import './App.css';
import WIP_page from './pages/wip';
// import VLibras from '@djpfs/react-vlibras/dist/types';
// import { useState } from 'react';
// import { LangDictContext, STD_LANGUAGE_DICTIONARY, LangDictState, STD_LANGUAGE_STATE, setLangDict } from './Contexts';

function App() {
  // const [appLangDict, setAppLangDict] = useState(STD_LANGUAGE_STATE);

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
            <Route path='mobilidade/aluno' element={<Aluno />} />
            <Route path='mobilidade/professor' element={<Professor />} />
            <Route path='mobilidade/servidor' element={<Servidor />} />
            
            <Route path='estrangeiros' element={<Estrangeiros />} />
            <Route path='estrangeiros/guias' element={<Guias />} />

            <Route path='informacoes' element={<Informacoes />} />
            <Route path='informacoes/convenios' element={<Convenios />} />
            <Route path='informacoes/dia' element={<Dia />} />
            <Route path='informacoes/pesquisa' element={<Pesquisa />} />

            <Route path='contato' element={<WIP_page />} />
          </Route >
        </Routes>
        {/* </LangDictContext.Provider> */}
      <AppFooter />
    </BrowserRouter>
  );
}

export default App;
