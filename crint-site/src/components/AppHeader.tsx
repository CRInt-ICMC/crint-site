import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { STRAPI_URL, STRAPI_API_TOKEN } from '../utils/constants';
import { updateUserSettings, useLoading, useSettings } from '../utils/utils';
import { useMediaPredicate } from 'react-media-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { ApiTopico, ApiPopup, ApiPagina } from '../utils/types';
import { readCache, setCache } from '../Caching';
import axios from 'axios';
import DropDownMenu from './DropDownMenu';
import LangSystem from './LangSystem';
import FontSizeSystem from './FontSizeSystem';
import AnimateHeight from 'react-animate-height';
import './AppHeader.scss';

const topics = (topicos: ApiTopico[]) => (
    <div className='topics'>
        {
            topicos.map((topico) => (<DropDownMenu
                key={String(topico.attributes.Nome)}
                head={<p>{String(topico.attributes.Nome)}</p>}
                body={<span className='subtopics' >
                    {
                        (topico.attributes.paginas as any)['data'].map((pagina: ApiPagina) => (
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

const topicsMobile = (topicos: ApiTopico[], display: boolean, setDisplay: CallableFunction) => (
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
                                (topico.attributes.paginas as any)['data'].map((pagina: ApiPagina) => (
                                    <Link
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
    ICMC: strapiImageData,
    ICMC_mini: strapiImageData,
}

const AppHeader = () => {
    // Hooks    
    const context = useSettings();
    const { userSettings } = context;
    const { addLoadingCoins, subLoadingCoins } = useLoading();
    const [headerImages, setHeaderImages] = useState<HeaderImages>();
    const [popupText, setPopupText] = useState<ApiPopup>();
    const [topicos, setTopicos] = useState<ApiTopico[]>();
    const [display, setDisplay] = useState(false);
    const mobile = useMediaPredicate("(orientation: portrait)");

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
                    const dataImages = {
                        ICMC: response['data']['data']['attributes']['ICMC']['data']['attributes'] as strapiImageData,
                        ICMC_mini: response['data']['data']['attributes']['ICMC_mini']['data']['attributes'] as strapiImageData,
                    };

                    setHeaderImages(dataImages);
                    setCache('headerImages', dataImages);
                    subLoadingCoins();
                })
        }

        if (cachePopupText) {
            setPopupText(cachePopupText);
        }

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
                    const dataTopicos: ApiTopico[] = [];
                    response['data']['data'].map((topico: ApiTopico) => {
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
                        <Link to={'/'}><img className='logo-crint' alt='Link Página Principal' src={STRAPI_URL + (mobile ? headerImages.ICMC_mini.url : headerImages.ICMC.url)} /></Link>
                    }
                </div>

                {/* TÓPICOS */}
                <div className='navbar-center' role='navigation'>
                    {topicos && !mobile && topics(topicos)}
                    {topicos && mobile && topicsMobile(topicos, display, setDisplay)}
                </div>
                {/* OPÇÕES */}
                <div className='navbar-right'>
                    <LangSystem />
                    <FontSizeSystem />
                </div>
            </nav>

            {/* Aparece caso o usuário não tenha consentido ainda */}
            {!userSettings.cookieConsent && popupText &&
                <div className='popup-root'>
                    <h3> {String(popupText.attributes.Titulo)} </h3>

                    <p>
                        {String(popupText.attributes.Corpo)}
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