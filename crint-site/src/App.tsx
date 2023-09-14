import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import VLibras from '@djpfs/react-vlibras';
import { ConfigContext, STD_CONFIG_STATE } from './Context';

import Homepage from './paginas/homepage';
import AppHeader from './componentes/AppHeader';
import AppFooter from './componentes/AppFooter';

import Aluno from './paginas/mobilidade subpaginas/alunos';
import Professor from './paginas/mobilidade subpaginas/professores';
import Servidor from './paginas/mobilidade subpaginas/servidores';

import Guias from './paginas/estrangeiros subpaginas/guias';

import Convenios from './paginas/informação subpaginas/convenios';
import Dia from './paginas/informação subpaginas/dia';
import Pesquisa from './paginas/informação subpaginas/pesquisa';

import Creditos from './paginas/outros/credits';
import Privacidade from './paginas/outros/privacy';

import NotFound from './paginas/outros/NotFound';


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
            <Route path='mobilidade/aluno' element={<Aluno />} />
            <Route path='mobilidade/professor' element={<Professor />} />
            <Route path='mobilidade/servidor' element={<Servidor />} />
            
            <Route path='estrangeiros/guias' element={<Guias />} />

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
