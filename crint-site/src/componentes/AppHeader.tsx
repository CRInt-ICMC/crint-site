// COMPONENTES
import { ReactNode, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_LANGUAGE, FONTE_MAXIMA, FONTE_MINIMA, AVAILABLE_LANGUAGES, STRAPI_URL, STRAPI_API_TOKEN } from '../utils/appConstants';
import { saveSettings, updateUserConfig } from '../utils/utils';
import { ConfigContext } from '../Context';
import { ApiHeaderHeader, ApiPopupDePrivacidadePopupDePrivacidade } from '../utils/generated/contentTypes';
import DropDownMenu from './DropDownMenu';
import axios from 'axios';
import Popup from './Popup';
// CSS
import './AppHeader.scss';
// IMAGENS E ÍCONES
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const topics = (dictionary : ApiHeaderHeader, fontSizeMod : number) => {
    // Subtópicos de cada tópico
    let mobilidadeBody : ReactNode = (
        <span className='subtopics'>
            <Link to={'mobilidade/alunos'}> {'>'} {String(dictionary?.attributes.Alunos)} </Link>
            <Link to={'mobilidade/professores'}> {'>'} {String(dictionary?.attributes.Professores)} </Link>
            <Link to={'mobilidade/servidores'}> {'>'} {String(dictionary?.attributes.Servidores)} </Link>
        </span>
    );

    let estrangeirosBody : ReactNode = (
        <span className='subtopics'>
            <Link to={'estrangeiros/guias'}> {'>'} {String(dictionary?.attributes.Guias)} </Link>
        </span>
    );

    let informacoesBody : ReactNode = (
        <span className='subtopics'>
            <Link to={'informacoes/convenios'}> {'>'} {String(dictionary?.attributes.Convenios)} </Link>
            <Link to={'informacoes/dia'}> {'>'} {String(dictionary?.attributes.DIA)} </Link>
            <Link to={'informacoes/pesquisa'}> {'>'} {String(dictionary?.attributes.Pesquisa_conduzida)} </Link>
        </span>
    );

    // Cria os tópicos e um menu dropdown para cada um deles
    return (
        <span className='topics' style={{fontSize: fontSizeMod + 'em'}}>
            <DropDownMenu 
                head={<p>{String(dictionary?.attributes.Mobilidade)}</p>}
                body={mobilidadeBody} 
                fontSize={fontSizeMod}
                />

            <DropDownMenu 
                head={<p>{String(dictionary?.attributes.Estrangeiros)}</p>} 
                body={estrangeirosBody} 
                fontSize={fontSizeMod}
                />

            <DropDownMenu 
                head={<p>{String(dictionary?.attributes.Informacoes)}</p>} 
                body={informacoesBody}
                fontSize={fontSizeMod}
                />
        </span>
    );
}

const languages = (currentLang : string, setLang : CallableFunction, bandeiras : {PT : string, EN : string}) => {
    const langDescs = [
        {id: 'pt', alt: 'Mudar para português', flag: STRAPI_URL + bandeiras.PT},
        {id: 'en', alt: 'Change to English', flag: STRAPI_URL + bandeiras.EN},
    ];
    
    return (
        <div className='flags'>
            { // Adiciona bandeiras de todas as linguagens, exceto a linguagem atual
            langDescs.map((desc) => {
                if (desc.id !== currentLang) {
                    return (
                        <button key={desc.id} onClick={() => setLang(desc.id)}>
                            <img alt={desc.alt} src={desc.flag} />
                        </button>
                    );
                }
            })}
        </div>
    );
}

const options = (currentFontSizeMod : number, setFontSizeMod : CallableFunction) => (
    // Apenas mostra os botões se o tamanho não estiver em seu limite máximo ou mínimo
    <div className='options'>
        {currentFontSizeMod < FONTE_MAXIMA && <button className='increase-button' onClick={() => setFontSizeMod(currentFontSizeMod + 0.1)}><FontAwesomeIcon icon={faPlus} /></button>}
        {currentFontSizeMod > FONTE_MINIMA && <button className='decrease-button' onClick={() => setFontSizeMod(currentFontSizeMod - 0.1)}><FontAwesomeIcon icon={faMinus} /></button>}
    </div>
);

interface HeaderImages {
    ICMC : string,
    FLAGS : {
        PT : string,
        EN : string,
    },
}

const AppHeader = () => {
    // Hooks    
    const {userConfig, setUserConfig} = useContext(ConfigContext);
    const [currentLang, setLang] = useState(userConfig?.lang || DEFAULT_LANGUAGE);
    const [currentFontSizeMod, setFontSizeMod] = useState(userConfig?.fontSizeMod || 1);
    const [langDict, setLangDict] = useState<ApiHeaderHeader>();
    const [popupPrivacidade, setPopupPrivacidade] = useState<ApiPopupDePrivacidadePopupDePrivacidade>();
    const [imagensHeader, setImagensHeader] = useState<HeaderImages>();
    
    // Executa apenas uma vez quando a linguagem é alterada
    useEffect(() => {
        axios.get(STRAPI_URL + '/api/header?populate=*&locale=' + userConfig?.lang, {'headers': {'Authorization': STRAPI_API_TOKEN}})
        .then((response) => {
            setLangDict(response['data']['data'] as ApiHeaderHeader);
            setImagensHeader({
                ICMC: response['data']['data']['attributes']['ICMC']['data']['attributes']['url'],
                FLAGS: {
                    EN: response['data']['data']['attributes']['bandeira_en']['data']['attributes']['url'],
                    PT: response['data']['data']['attributes']['bandeira_pt']['data']['attributes']['url'],
                },
            });
        })
        axios.get(STRAPI_URL + '/api/popup-de-privacidade?locale=' + userConfig?.lang).then((response) => {
            setPopupPrivacidade(response['data']['data'] as ApiPopupDePrivacidadePopupDePrivacidade);
        })
    }, [userConfig?.lang]);

    // Esse bloco lida com a língua atual
    useEffect(() => {
        if (!userConfig?.lang)
            changeLang(DEFAULT_LANGUAGE);

        // Se houve mudança na língua, atualiza os valores e a página
        else if (userConfig.lang !== currentLang)
            changeLang(currentLang);

    }, [currentLang]);

    // Atualiza a linguagem atual
    async function changeLang(lang : string) {
        // Impede o uso inapropriado da função
        if (!AVAILABLE_LANGUAGES.includes(lang)) {
            changeLang(DEFAULT_LANGUAGE);
            return;
        }

        setLang(lang)

        if (setUserConfig && userConfig)
            setUserConfig(updateUserConfig(userConfig, {lang: lang}));            
    }
    

    // Esse bloco lida com o tamanho da fonte    
    useEffect(() => {
        if (!userConfig?.fontSizeMod)
            changeFontSizeMod(1);

        else if (userConfig.fontSizeMod !== currentFontSizeMod)
            changeFontSizeMod(currentFontSizeMod);

    }, [currentFontSizeMod]);

    // Atualiza as modificações ao tamanho da fonte
    const changeFontSizeMod = (fontSizeMod : number) => {
        // Impede o uso inapropriado da função
        if (fontSizeMod < FONTE_MINIMA || fontSizeMod > FONTE_MAXIMA) 
            return;

        if (setUserConfig && userConfig)
            setUserConfig(updateUserConfig(userConfig, {fontSizeMod: fontSizeMod}));
    }

    // Marca que o usuário concordou com os termos de privacidade
    const setConsentTrue = () => { 
        if(setUserConfig && userConfig) {
            setUserConfig(updateUserConfig(userConfig, {cookieConsent: true}))
            saveSettings(userConfig);
        }
    }

    // Salva a configuração a cada modificação
    if (userConfig)
        saveSettings(userConfig);

    return (
        <header className='header-root'>
            <nav className='navbar'>
                {/* LOGOS */}
                <div className='navbar-left'>
                    <span className='logos'>
                        { imagensHeader?.ICMC && 
                                <Link to={'/'}><img className='logo-crint' alt='Link Página Principal' src={STRAPI_URL + imagensHeader?.ICMC} /></Link>
                        }
                    </span>
                </div>

                {/* TÓPICOS */}
                <div className='navbar-center' role='navigation'>
                    {langDict && topics(langDict, currentFontSizeMod)}
                </div>
                {/* OPÇÕES */}
                <div className='navbar-right'>
                    { imagensHeader?.FLAGS &&
                        languages(currentLang, changeLang, imagensHeader.FLAGS)
                    }

                    {options(currentFontSizeMod, setFontSizeMod)}
                </div>
            </nav>

            {/* Aparece caso o usuário não tenha consentido ainda */}
            { !userConfig?.cookieConsent && popupPrivacidade &&
                <Popup 
                    head={String(popupPrivacidade?.attributes.Titulo)} 
                    body={
                            <>
                                <p>
                                    {String(popupPrivacidade?.attributes.Corpo)} 
                                    <Link to={'privacidade'}>{String(popupPrivacidade?.attributes.Saiba_mais)}</Link>
                                </p>
                                <button onClick={setConsentTrue}>{String(popupPrivacidade?.attributes.Saiba_mais)}</button>
                            </>
                        } 
                    />
            }

        </header>
    );
}

export default AppHeader;