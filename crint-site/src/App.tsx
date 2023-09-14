import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ConfigContext, STD_CONFIG_STATE } from './Context';
import VLibras from '@djpfs/react-vlibras';

import AppHeader from './componentes/AppHeader';
import Homepage from './paginas/homepage';
import PageLoader from './componentes/PageLoader';
import AppFooter from './componentes/AppFooter';

import Dia from './paginas/informações paginas/dia';
import Pesquisa from './paginas/informações paginas/pesquisa';

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

            <Route path='informacoes/dia' element={<Dia />} />
            <Route path='informacoes/pesquisa' element={<Pesquisa />} />
          </Route>

          <Route path='*' element={<PageLoader />} /> 
        </Routes>
        <VLibras />
        <AppFooter />
      </ConfigContext.Provider>
    </BrowserRouter>
  );
}

export default App;
