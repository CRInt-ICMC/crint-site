// COMPONENTES
import { ReactNode, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { STRAPI_URL, STRAPI_API_TOKEN } from '../utils/appConstants';
import { saveSettings, updateUserSettings } from '../utils/utils';
import { SettingsContext } from '../Contexto';
import { ApiHeaderHeader, ApiPopupDePrivacidadePopupDePrivacidade } from '../utils/generated/contentTypes';
import DropDownMenu from './DropDownMenu';
import axios from 'axios';
import Popup from './Popup';
// CSS
import './AppHeader.scss';
// IMAGENS E ÍCONES
import { useMediaPredicate } from 'react-media-hook';
import LangSystem from './LangSystem';
import FontSizeSystem from './FontSizeSystem';

const topics = (textData: ApiHeaderHeader, fontSizeMod: number) => {
    // Subtópicos de cada tópico
    let mobilidadeBody: ReactNode = (
        <span className='subtopics' style={{ fontSize: fontSizeMod + 'em' }}>
            <Link to={'mobilidade/alunos'}> {String(textData?.attributes.Alunos)} </Link>
            <Link to={'mobilidade/professores'}> {String(textData?.attributes.Professores)} </Link>
            <Link to={'mobilidade/servidores'}> {String(textData?.attributes.Servidores)} </Link>
        </span>
    );

    let estrangeirosBody: ReactNode = (
        <span className='subtopics' style={{ fontSize: fontSizeMod + 'em' }}>
            <Link to={'estrangeiros/guias'}> {String(textData?.attributes.Guias)} </Link>
        </span>
    );

    let informacoesBody: ReactNode = (
        <span className='subtopics' style={{ fontSize: fontSizeMod + 'em' }}>
            <Link to={'informacoes/convenios'}> {String(textData?.attributes.Convenios)} </Link>
            <Link to={'informacoes/dia'}> {String(textData?.attributes.DIA)} </Link>
            <Link to={'informacoes/pesquisa'}> {String(textData?.attributes.Pesquisa_conduzida)} </Link>
        </span>
    );

    // Cria os tópicos e um menu dropdown para cada um deles
    return (
        <span className='topics'>
            <DropDownMenu
                head={<p>{String(textData?.attributes.Mobilidade)}</p>}
                body={mobilidadeBody}
                fontSize={fontSizeMod}
            />

            <DropDownMenu
                head={<p>{String(textData?.attributes.Estrangeiros)}</p>}
                body={estrangeirosBody}
                fontSize={fontSizeMod}
            />

            <DropDownMenu
                head={<p>{String(textData?.attributes.Informacoes)}</p>}
                body={informacoesBody}
                fontSize={fontSizeMod}
            />
        </span>
    );
}

interface HeaderImages {
    ICMC: strapiImageData,
    ICMC_mini: strapiImageData,
}

const AppHeader = () => {
    // Hooks    
    const { userSettings, setUserSettings } = useContext(SettingsContext);
    const [textData, setTextData] = useState<ApiHeaderHeader>();
    const [popupText, setPopupText] = useState<ApiPopupDePrivacidadePopupDePrivacidade>();
    const [headerImages, setHeaderImages] = useState<HeaderImages>();
    const mobile = useMediaPredicate("(max-width: 768px)");

    // Executa apenas uma vez quando a linguagem é alterada
    useEffect(() => {
        axios
            .get(STRAPI_URL + '/api/header?populate=*&locale=' + userSettings?.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
            .then((response) => {
                setTextData(response['data']['data'] as ApiHeaderHeader);
                
                setHeaderImages({
                    ICMC: response['data']['data']['attributes']['ICMC']['data']['attributes'] as strapiImageData,
                    ICMC_mini: response['data']['data']['attributes']['ICMC_mini']['data']['attributes'] as strapiImageData,
                });
            })

        axios
            .get(STRAPI_URL + '/api/popup-de-privacidade?locale=' + userSettings?.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
            .then((response) => {
                setPopupText(response['data']['data'] as ApiPopupDePrivacidadePopupDePrivacidade);
            })
    }, [userSettings?.lang]);

    // Marca que o usuário concordou com os termos de privacidade
    const setConsentTrue = () => {
        if (setUserSettings && userSettings) {
            setUserSettings(updateUserSettings(userSettings, { cookieConsent: true }))
            saveSettings(userSettings);
        }
    }

    // Salva a configuração a cada modificação
    if (userSettings)
        saveSettings(userSettings);

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
                    {textData && topics(textData, userSettings?.fontSizeMod || 1)}
                </div>
                {/* OPÇÕES */}
                <div className='navbar-right'>
                    <LangSystem />
                    <FontSizeSystem />
                </div>
            </nav>

            {/* Aparece caso o usuário não tenha consentido ainda */}
            {!userSettings?.cookieConsent && popupText &&
                <Popup
                    head={String(popupText?.attributes.Titulo)}
                    body={
                        <>
                            <p className='privacidade'>
                                {String(popupText?.attributes.Corpo)}
                                <Link to={'privacidade'}>{String(popupText?.attributes.Saiba_mais)}</Link>
                            </p>
                            <button onClick={setConsentTrue}>{String(popupText?.attributes.Botao)}</button>
                        </>
                    }
                />
            }

        </header>
    );
}

export default AppHeader;