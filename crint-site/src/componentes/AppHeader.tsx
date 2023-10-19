import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { STRAPI_URL, STRAPI_API_TOKEN } from '../utils/appConstants';
import { updateUserSettings, useSettings } from '../utils/utils';
import { useMediaPredicate } from 'react-media-hook';
import axios from 'axios';
import DropDownMenu from './DropDownMenu';
import Popup from './Popup';
import LangSystem from './LangSystem';
import FontSizeSystem from './FontSizeSystem';
import AnimateHeight from 'react-animate-height';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { ApiTopico, ApiPopup, ApiPagina } from '../utils/types';
import './AppHeader.scss';
import { readCache, setCache } from '../Caching';

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
                        <span>{String(topico.attributes.Nome)}</span>
                        <span className='subtopics'>
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
    const [popupText, setPopupText] = useState<ApiPopup>();
    const [headerImages, setHeaderImages] = useState<HeaderImages>();
    const [topicos, setTopicos] = useState<ApiTopico[]>();
    const [display, setDisplay] = useState(false);
    const mobile = useMediaPredicate("(orientation: portrait)");

    // Executa apenas quando a linguagem é alterada
    useEffect(() => {
        const cacheHeaderImages = readCache('headerImages');
        const cachePopupText = readCache('popup' + userSettings.lang);
        const cacheTopicos = readCache('topicos' + userSettings.lang);

        if (cacheHeaderImages) 
            setHeaderImages(cacheHeaderImages); 

        else
            axios
                .get(STRAPI_URL + '/api/header?populate=*&locale=' + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    let holder = {
                        ICMC: response['data']['data']['attributes']['ICMC']['data']['attributes'] as strapiImageData,
                        ICMC_mini: response['data']['data']['attributes']['ICMC_mini']['data']['attributes'] as strapiImageData,
                    };

                    setHeaderImages(holder);
                    setCache('headerImages', holder);
                })

        if (cachePopupText)
            setPopupText(cacheHeaderImages);

        else
            axios
                .get(STRAPI_URL + '/api/popup-de-privacidade?locale=' + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    let holder = response['data']['data'] as ApiPopup;
                    setPopupText(holder);
                    setCache('popup' + userSettings.lang, holder);
                })

        if (cacheTopicos)
            setTopicos(cacheTopicos);

        else
            axios
                .get(STRAPI_URL + '/api/topicos?populate=*&locale=' + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    let holder: ApiTopico[] = [];
                    response['data']['data'].map((topico: ApiTopico) => {
                        holder.push(topico);
                    })

                    setTopicos(holder);
                    setCache('topicos' + userSettings.lang, holder);
                    console.log("Masuq?")
                })
    }, [userSettings.lang]);

    return (
        <header className='header-root'>
            <nav className='navbar'>
                {/* LOGOS */}
                <div className='navbar-left'>
                    <span className='logos'>
                        {headerImages?.ICMC &&
                            <Link to={'/'}><img className='logo-crint' alt='Link Página Principal' src={STRAPI_URL + (mobile ? headerImages?.ICMC_mini.url : headerImages?.ICMC.url)} /></Link>
                        }
                    </span>
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
                <Popup
                    head={String(popupText?.attributes.Titulo)}
                    body={
                        <>
                            <p className='privacidade'>
                                {String(popupText?.attributes.Corpo) + ' '}
                                <Link to={'privacidade'}>{String(popupText?.attributes.Saiba_mais)}</Link>
                            </p>
                            <button onClick={() => updateUserSettings(context, { cookieConsent: true })}> {String(popupText?.attributes.Botao)}</button>
                        </>
                    }
                />
            }

        </header>
    );
}

export default AppHeader;