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
import { useEffect, useState } from 'react';
import { SettingsContext, STD_SETTINGS_STATE, } from './Settings';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import VLibras from '@djpfs/react-vlibras';

import AppHeader from './components/AppHeader';
import Homepage from './components/Homepage';
import PageLoader from './components/PageLoader';
import DIA from './components/DIA';
import AppFooter from './components/AppFooter';
import { LoadingContext, STD_COINS_STATE } from './Loading';
import LoadingScreen from './components/LoadingScreen';
import axios from 'axios';
import { STRAPI_URL, STRAPI_API_TOKEN } from './utils/constants';
import { ApiEstilo } from './utils/types';

function App() {
  // Carrega o estilo da página definido pelo servidor
  useEffect(() => {
    axios
      .get(STRAPI_URL + '/api/estilo?populate=*', { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
      .then((response) => {
        const data = response['data']['data'] as ApiEstilo;
        const favicon = (data.attributes.Favicon as any)['data']['attributes'] as StrapiImageData;

        // Se não houver dados, não faz nada
        if (data === undefined)
          return;

        /* ATUALIZA O FAVICON */
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement('link');

          // @ts-expect-error - Necessário, pois o elemento tem essas propriedades, mas o typescript não reconhece
          link.rel = 'icon';

          document.getElementsByTagName('head')[0].appendChild(link);
        }

        // @ts-expect-error - Necessário, pois o elemento tem essas propriedades, mas o typescript não reconhece
        link.href = STRAPI_URL + favicon.url;

        document.title = String(data.attributes.Aba_texto);

        /* ATUALIZA AS CORES BASE, DE FUNDO E DE TEXTO */
        const root = document.documentElement;
        root.style.setProperty(
          '--base-bg-color',
          String(data.attributes.Cor_base)
        );

        root.style.setProperty(
          '--global-bg-color',
          String(data.attributes.Cor_fundo)
        );

        root.style.setProperty(
          '--base-text-color',
          String(data.attributes.Cor_texto)
        );
      })
  },
    []);

  // Carrega os ícones do fontawesome
  library.add(fas, far, fab);

  // Declara os estados globais do site
  const [appSettingsState, setAppSettingsState] = useState(STD_SETTINGS_STATE);
  const [appLoadingState, setAppLoadingState] = useState(STD_COINS_STATE);

  // Declara as funções de adicionar e remover moedas
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
