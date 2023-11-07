import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { SettingsContext, STD_SETTINGS_STATE, } from './Settings';
import VLibras from '@djpfs/react-vlibras';

import AppHeader from './components/AppHeader';
import Homepage from './components/Homepage';
import PageLoader from './components/PageLoader';
import AppFooter from './components/AppFooter';
import { LoadingContext, STD_COINS_STATE } from './Loading';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [appSettingsState, setAppSettingsState] = useState(STD_SETTINGS_STATE);
  const [appLoadingState, setAppLoadingState] = useState(STD_COINS_STATE);

  const coins: number[] = []

  const addCoin = () => {
    coins.push(1);
    setAppLoadingState(coins.length);
  }

  const subCoin = () => {
    coins.pop();
    setAppLoadingState(coins.length);
  }

  return (
    <BrowserRouter>
      <SettingsContext.Provider
        value={{
          userSettings: appSettingsState,
          setUserSettings: setAppSettingsState,
        }}
      >
        <LoadingContext.Provider
          value={{
            loadingCoins: appLoadingState,
            addLoadingCoins: addCoin,
            subLoadingCoins: subCoin,
          }}
        >
          <LoadingScreen />
          <AppHeader />
          <Routes>
            <Route index element={<Homepage />} />

            {/* Todas as páginas (exceto as anteriores) são carregadas pelo PageLoader */}
            <Route path='*' element={<PageLoader />} />
          </Routes>
          <AppFooter />
        </LoadingContext.Provider>
      </SettingsContext.Provider>
      <VLibras />
    </BrowserRouter>
  );
}

export default App;
