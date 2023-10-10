// COMPONENTES
import { ReactNode, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { STRAPI_URL, STRAPI_API_TOKEN } from '../utils/appConstants';
import { updateUserSettings } from '../utils/utils';
import { SettingsContext } from '../Contexto';
import { ApiHeaderHeader, ApiPopupDePrivacidadePopupDePrivacidade } from '../utils/generated/contentTypes';
import { useMediaPredicate } from 'react-media-hook';
import axios from 'axios';
import DropDownMenu from './DropDownMenu';
import Popup from './Popup';
import LangSystem from './LangSystem';
import FontSizeSystem from './FontSizeSystem';// CSS
import './AppHeader.scss';
import AnimateHeight from 'react-animate-height';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';


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

const topicsMobile = (textData: ApiHeaderHeader, fontSizeMod: number, display: boolean, setDisplay: CallableFunction) => {
    // Subtópicos de cada tópico
    let mobilidadeBody: ReactNode = (
        <div>
            <span>{String(textData?.attributes.Mobilidade)}</span>
            <span className='subtopics' style={{ fontSize: fontSizeMod + 'em' }}>
                <Link to={'mobilidade/alunos'}> {String(textData?.attributes.Alunos)} </Link>
                <Link to={'mobilidade/professores'}> {String(textData?.attributes.Professores)} </Link>
                <Link to={'mobilidade/servidores'}> {String(textData?.attributes.Servidores)} </Link>
            </span>
        </div>
    );

    let estrangeirosBody: ReactNode = (
        <div>
            <span>{String(textData?.attributes.Estrangeiros)}</span>
            <span className='subtopics' style={{ fontSize: fontSizeMod + 'em' }}>
                <Link to={'estrangeiros/guias'}> {String(textData?.attributes.Guias)} </Link>
            </span>
        </div>
    );

    let informacoesBody: ReactNode = (
        <div>
            <span>{String(textData?.attributes.Informacoes)}</span>
            <span className='subtopics' style={{ fontSize: fontSizeMod + 'em' }}>
                <Link to={'informacoes/convenios'}> {String(textData?.attributes.Convenios)} </Link>
                <Link to={'informacoes/dia'}> {String(textData?.attributes.DIA)} </Link>
                <Link to={'informacoes/pesquisa'}> {String(textData?.attributes.Pesquisa_conduzida)} </Link>
            </span>
        </div>
    );

    console.log(display)

    // Cria os tópicos e um menu dropdown para cada um deles
    return (
        <div className='topics'>
            <button onClick={() => setDisplay(!display)}><FontAwesomeIcon icon={faAngleDoubleDown} /></button>
            <AnimateHeight height={display ? 'auto' : 0} className='dropMenuItens'>
                {mobilidadeBody}
                {estrangeirosBody}
                {informacoesBody}
            </AnimateHeight>
        </div>
    );
}

interface HeaderImages {
    ICMC: strapiImageData,
    ICMC_mini: strapiImageData,
}

const AppHeader = () => {
    // Hooks    
    const context = useContext(SettingsContext);
    const { userSettings } = context;
    const [textData, setTextData] = useState<ApiHeaderHeader>();
    const [popupText, setPopupText] = useState<ApiPopupDePrivacidadePopupDePrivacidade>();
    const [headerImages, setHeaderImages] = useState<HeaderImages>();
    const [display, setDisplay] = useState(false);
    const mobile = useMediaPredicate("(orientation: portrait)");

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
                    {textData && !mobile && topics(textData, userSettings?.fontSizeMod || 1)}
                    {textData && mobile && topicsMobile(textData, userSettings?.fontSizeMod || 1, display, setDisplay)}
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
                            <button onClick={() => updateUserSettings(context, { cookieConsent: true })}> {String(popupText?.attributes.Botao)}</button>
                        </>
                    }
                />
            }

        </header>
    );
}

export default AppHeader;