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

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { STRAPI_URL, STRAPI_API_TOKEN } from '../utils/constants';
import { updateUserSettings, useLoading, useSettings } from '../utils/utils';
import { useMediaPredicate } from 'react-media-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { ApiTopic, ApiPopup, ApiPage } from '../utils/types';
import { readCache, setCache } from '../Caching';
import axios from 'axios';
import DropdownMenu from './DropdownMenu';
import LangSystem from './LangSystem';
import FontsizeSystem from './FontsizeSystem';
import AnimateHeight from 'react-animate-height';
import './AppHeader.scss';

const topics = (topicos: ApiTopic[]) => (
    <div className='topics'>
        {
            topicos.map((topico) => (<DropdownMenu
                key={String(topico.attributes.Nome)}
                head={<p>{String(topico.attributes.Nome)}</p>}
                body={<span className='subtopics'>
                    {
                        (topico.attributes.paginas as any)['data'].map((pagina: ApiPage) => (
                            <Link
                                key={String(pagina.attributes.Titulo)}
                                to={String(pagina.attributes.URL)}
                            >
                                {String(pagina.attributes.Titulo)}
                            </Link>
                        ))
                    }
                </span>
                }
            />
            ))
        }
    </div>
)

const topicsMobile = (topicos: ApiTopic[], display: boolean, setDisplay: CallableFunction, currentUrl: string) => (
    <div className='topics'>
        <button onClick={() => setDisplay(!display)} style={{ backgroundColor: display ? '#061e3d' : 'transparent' }}>
            <div>Menu</div>
            <FontAwesomeIcon icon={display ? faAngleUp : faAngleDown} />
        </button>
        <AnimateHeight height={display ? 'auto' : 0} className='dropMenuItens'>
            {
                topicos.map((topico) => (
                    <div key={String(topico.attributes.Nome)}>
                        <span className='subtopics'>
                            <span className='title'>{String(topico.attributes.Nome)}</span>
                            {
                                (topico.attributes.paginas as any)['data'].map((pagina: ApiPage) => (
                                    <Link className={(currentUrl === String(pagina.attributes.URL)) ? 'highlight' : ''}
                                        key={String(pagina.attributes.Titulo)}
                                        to={String(pagina.attributes.URL)}
                                    >
                                        {String(pagina.attributes.Titulo)}
                                    </Link>
                                ))
                            }
                        </span>
                    </div>
                ))
            }
        </AnimateHeight>
    </div>
)

interface HeaderImages {
    icmc: StrapiImageData,
    icmcMini: StrapiImageData,
}

const AppHeader = () => {
    // Hooks    
    const context = useSettings();
    const { userSettings } = context;
    const { addLoadingCoins, subLoadingCoins } = useLoading();

    const [headerImages, setHeaderImages] = useState<HeaderImages>();
    const [popupText, setPopupText] = useState<ApiPopup>();
    const [topicos, setTopicos] = useState<ApiTopic[]>();
    const [display, setDisplay] = useState(false);

    const mobile = useMediaPredicate("(orientation: portrait)");
    const location = useLocation();

    // Recolhe o menu do mobile quando a página muda
    useEffect(() => {
        setDisplay(false);
    }, [location.pathname]);

    // Executa apenas quando a linguagem é alterada
    useEffect(() => {
        const cacheHeaderImages = readCache('headerImages');
        const cachePopupText = readCache('popup' + '-' + userSettings.lang);
        const cacheTopicos = readCache('topicos' + '-' + userSettings.lang);

        if (cacheHeaderImages)
            setHeaderImages(cacheHeaderImages);

        else {
            addLoadingCoins();

            axios
                .get(STRAPI_URL + '/api/header?populate=*&locale=' + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const data = response['data']['data'];

                    const dataImages = {
                        icmc: data['attributes']['ICMC']['data']['attributes'] as StrapiImageData,
                        icmcMini: data['attributes']['ICMC_mini']['data']['attributes'] as StrapiImageData,
                    };

                    setHeaderImages(dataImages);
                    setCache('headerImages', dataImages);
                    subLoadingCoins();
                })
        }

        if (cachePopupText)
            setPopupText(cachePopupText);

        else {
            addLoadingCoins();

            axios
                .get(STRAPI_URL + '/api/popup-de-privacidade?locale=' + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const dataPopup = response['data']['data'] as ApiPopup;
                    setPopupText(dataPopup);
                    setCache('popup' + '-' + userSettings.lang, dataPopup);
                    subLoadingCoins();
                })
        }

        if (cacheTopicos)
            setTopicos(cacheTopicos);

        else {
            addLoadingCoins();

            axios
                .get(STRAPI_URL + '/api/topicos?populate=*&locale=' + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const dataTopicos: ApiTopic[] = [];
                    response['data']['data'].map((topico: ApiTopic) => {
                        dataTopicos.push(topico);
                    })

                    setTopicos(dataTopicos);
                    setCache('topicos' + '-' + userSettings.lang, dataTopicos);
                    subLoadingCoins();
                })
        }
    }, [userSettings.lang]);

    return (
        <header className='header-root'>
            <nav className='navbar'>
                {/* LOGO */}
                <div className='navbar-left'>
                    {headerImages &&
                        <Link to={'/'}><img className='logo-crint' alt='Link Página Principal' src={STRAPI_URL + (mobile ? headerImages.icmcMini.url : headerImages.icmc.url)} /></Link>
                    }
                </div>

                {/* TÓPICOS */}
                <div className='navbar-center' role='navigation'>
                    {topicos && !mobile && topics(topicos)}
                    {topicos && mobile && topicsMobile(topicos, display, setDisplay, location.pathname)}
                </div>

                {/* OPÇÕES */}
                <div className='navbar-right'>
                    <LangSystem />
                    <FontsizeSystem />
                </div>
            </nav>

            {/* Aparece caso o usuário não tenha consentido ainda */}
            {!userSettings.cookieConsent && popupText &&
                <div className='popup-root'>
                    <h3> {String(popupText.attributes.Titulo)} </h3>

                    <p>
                        {String(popupText.attributes.Corpo) + ' '}
                        <Link to={'privacidade'}>{String(popupText.attributes.Saiba_mais)}</Link>
                    </p>

                    <button onClick={() => updateUserSettings(context, { cookieConsent: true })}>
                        {String(popupText.attributes.Botao)}
                    </button>
                </div>
            }
        </header>
    );
}

export default AppHeader;