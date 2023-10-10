import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { SettingsContext, STD_SETTINGS_STATE, } from './Contexto';
import VLibras from '@djpfs/react-vlibras';

import AppHeader from './componentes/AppHeader';
import Homepage from './paginas/homepage';
import PageLoader from './componentes/PageLoader';
import AppFooter from './componentes/AppFooter';

// import Dia from './paginas/dia';
// import Pesquisa from './paginas/pesquisa';

function App() {
  let [appSettingsState, setAppSettingsState] = useState(STD_SETTINGS_STATE);

  return (
    <BrowserRouter>
      <SettingsContext.Provider
        value={{
          userSettings: appSettingsState,
          setUserSettings: setAppSettingsState,
        }}
      >
        <AppHeader />
        <Routes>
          <Route path='/'>
            <Route index element={<Homepage />} />

            {/* <Route path='informacoes/dia' element={<Dia />} />
            <Route path='informacoes/pesquisa' element={<Pesquisa />} /> */}
          </Route>

          {/* Todas as páginas (exceto as anteriores) são carregadas pelo PageLoader */}
          <Route path='*' element={<PageLoader />} />
        </Routes>
        <VLibras />
        <AppFooter />
      </SettingsContext.Provider>
    </BrowserRouter>
  );
}

export default App;
