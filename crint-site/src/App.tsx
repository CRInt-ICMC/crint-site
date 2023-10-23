import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { SettingsContext, STD_SETTINGS_STATE, } from './Settings';
import VLibras from '@djpfs/react-vlibras';

import AppHeader from './components/AppHeader';
import Homepage from './components/Homepage';
import PageLoader from './components/PageLoader';
import AppFooter from './components/AppFooter';

function App() {
  const [appSettingsState, setAppSettingsState] = useState(STD_SETTINGS_STATE);

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
