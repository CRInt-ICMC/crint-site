import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import VLibras from '@djpfs/react-vlibras';
import { ConfigContext, STD_CONFIG_STATE } from './Context';

import Homepage from './paginas/homepage';
import AppHeader from './componentes/AppHeader';
import AppFooter from './componentes/AppFooter';

import Dia from './paginas/informações paginas/dia';
import Pesquisa from './paginas/informações paginas/pesquisa';

import NotFound from './paginas/outros/NotFound';
import PageLoader from './componentes/PageLoader';


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
            <Route path='mobilidade/aluno' element={<PageLoader uid='alunos' />} />
            <Route path='mobilidade/professor' element={<PageLoader uid='professores' />} />
            <Route path='mobilidade/servidor' element={<PageLoader uid='servidores' />} />
            
            <Route path='estrangeiros/guias' element={<PageLoader uid='estrangeiros' />} />

            <Route path='informacoes/convenios' element={<PageLoader uid='convenios' />} />
            <Route path='informacoes/dia' element={<Dia />} />
            <Route path='informacoes/pesquisa' element={<Pesquisa />} />

            <Route path='creditos' element={<PageLoader uid='creditos' />} />
            <Route path='privacidade' element={<PageLoader uid='politica-privacidade' />} />
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
