import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import VLibras from '@djpfs/react-vlibras';
import { ConfigContext, STD_CONFIG_STATE } from './Context';

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

import Creditos from './pages/credits';
import Privacidade from './pages/privacy';

import NotFound from './pages/NotFound';

function App() {
	let [appConfigState, setAppConfigState] = useState(STD_CONFIG_STATE);

  return (
    <BrowserRouter>
      <ConfigContext.Provider
        value={{
          userConfig: appConfigState,
          setUserConfig: setAppConfigState,
        }}
        >
        <AppHeader/>
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

            <Route path='creditos' element={<Creditos />} />
            <Route path='privacidade' element={<Privacidade />} />
          </Route>

          <Route path='*' element={<NotFound />} /> 
        </Routes>
        <VLibras />
        <AppFooter />
      </ConfigContext.Provider>
    </BrowserRouter>
  );
}

export default App;
