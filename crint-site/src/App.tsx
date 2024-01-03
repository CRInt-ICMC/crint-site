// This file is part of CRInt-site.

// CRInt-site is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// CRInt-site is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with CRInt-site. If not, see <https://www.gnu.org/licenses/>.

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { SettingsContext, STD_SETTINGS_STATE, } from './Settings';
import VLibras from '@djpfs/react-vlibras';

import AppHeader from './components/AppHeader';
import Homepage from './components/Homepage';
import PageLoader from './components/PageLoader';
import DIA from './components/DIA';
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
            <Route path='/informacoes/dia' element={<DIA />} />

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
