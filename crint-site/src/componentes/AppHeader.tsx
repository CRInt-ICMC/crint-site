// COMPONENTES
import { ReactNode, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_LANGUAGE, MAX_FONT, MIN_FONT, AVAILABLE_LANGUAGES, STRAPI_URL, STRAPI_API_TOKEN } from '../utils/appConstants';
import { saveSettings, updateUserSettings } from '../utils/utils';
import { SettingsContext } from '../Contexto';
import { ApiHeaderHeader, ApiPopupDePrivacidadePopupDePrivacidade } from '../utils/generated/contentTypes';
import DropDownMenu from './DropDownMenu';
import axios from 'axios';
import Popup from './Popup';
// CSS
import './AppHeader.scss';
// IMAGENS E ÍCONES
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const topics = (textData : ApiHeaderHeader, fontSizeMod : number) => {
    // Subtópicos de cada tópico
    let mobilidadeBody : ReactNode = (
        <span className='subtopics' style={{fontSize: fontSizeMod + 'em'}}>
            <Link to={'mobilidade/alunos'}> {String(textData?.attributes.Alunos)} </Link>
            <Link to={'mobilidade/professores'}> {String(textData?.attributes.Professores)} </Link>
            <Link to={'mobilidade/servidores'}> {String(textData?.attributes.Servidores)} </Link>
        </span>
    );

    let estrangeirosBody : ReactNode = (
        <span className='subtopics' style={{fontSize: fontSizeMod + 'em'}}>
            <Link to={'estrangeiros/guias'}> {String(textData?.attributes.Guias)} </Link>
        </span>
    );

    let informacoesBody : ReactNode = (
        <span className='subtopics' style={{fontSize: fontSizeMod + 'em'}}>
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
    <div className='options-root'>
        <div className='options-buttons'>
            {currentFontSizeMod < MAX_FONT && <button className='increase-button' onClick={() => setFontSizeMod(currentFontSizeMod + 0.1)}><FontAwesomeIcon icon={faPlus} /></button>}
            {currentFontSizeMod > MIN_FONT && <button className='decrease-button' onClick={() => setFontSizeMod(currentFontSizeMod - 0.1)}><FontAwesomeIcon icon={faMinus} /></button>}
        </div>
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
    const {userSettings, setUserSettings} = useContext(SettingsContext);
    const [currentLang, setLang] = useState(userSettings?.lang || DEFAULT_LANGUAGE);
    const [currentFontSizeMod, setFontSizeMod] = useState(userSettings?.fontSizeMod || 1);
    const [textData, setTextData] = useState<ApiHeaderHeader>();
    const [popupText, setPopupText] = useState<ApiPopupDePrivacidadePopupDePrivacidade>();
    const [headerImages, setHeaderImages] = useState<HeaderImages>();
    
    // Executa apenas uma vez quando a linguagem é alterada
    useEffect(() => {
        axios.get(STRAPI_URL + '/api/header?populate=*&locale=' + userSettings?.lang, {'headers': {'Authorization': STRAPI_API_TOKEN}})
        .then((response) => {
            setTextData(response['data']['data'] as ApiHeaderHeader);
            setHeaderImages({
                ICMC: response['data']['data']['attributes']['ICMC']['data']['attributes']['url'],
                FLAGS: {
                    EN: response['data']['data']['attributes']['bandeira_en']['data']['attributes']['url'],
                    PT: response['data']['data']['attributes']['bandeira_pt']['data']['attributes']['url'],
                },
            });
        })
        axios.get(STRAPI_URL + '/api/popup-de-privacidade?locale=' + userSettings?.lang, {'headers': {'Authorization': STRAPI_API_TOKEN}})
        .then((response) => {
            setPopupText(response['data']['data'] as ApiPopupDePrivacidadePopupDePrivacidade);
        })
    }, [userSettings?.lang]);

    // Esse bloco lida com a língua atual
    useEffect(() => {
        if (!userSettings?.lang)
            changeLang(DEFAULT_LANGUAGE);

        // Se houve mudança na língua, atualiza os valores e a página
        else if (userSettings.lang !== currentLang)
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

        if (setUserSettings && userSettings)
            setUserSettings(updateUserSettings(userSettings, {lang: lang}));            
    }
    

    // Esse bloco lida com o tamanho da fonte    
    useEffect(() => {
        if (!userSettings?.fontSizeMod)
            changeFontSizeMod(1);

        else if (userSettings.fontSizeMod !== currentFontSizeMod)
            changeFontSizeMod(currentFontSizeMod);

    }, [currentFontSizeMod]);

    // Atualiza as modificações ao tamanho da fonte
    const changeFontSizeMod = (fontSizeMod : number) => {
        // Impede o uso inapropriado da função
        if (fontSizeMod < MIN_FONT) 
            fontSizeMod = MIN_FONT;

        else if (fontSizeMod > MAX_FONT) 
            fontSizeMod = MAX_FONT;

        if (setUserSettings && userSettings)
            setUserSettings(updateUserSettings(userSettings, {fontSizeMod: fontSizeMod}));
    }

    // Marca que o usuário concordou com os termos de privacidade
    const setConsentTrue = () => { 
        if(setUserSettings && userSettings) {
            setUserSettings(updateUserSettings(userSettings, {cookieConsent: true}))
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
                        { headerImages?.ICMC && 
                                <Link to={'/'}><img className='logo-crint' alt='Link Página Principal' src={STRAPI_URL + headerImages?.ICMC} /></Link>
                        }
                    </span>
                </div>

                {/* TÓPICOS */}
                <div className='navbar-center' role='navigation'>
                    { textData && topics(textData, currentFontSizeMod)}
                </div>
                {/* OPÇÕES */}
                <div className='navbar-right'>
                    { headerImages?.FLAGS && languages(currentLang, changeLang, headerImages.FLAGS) }

                    {options(currentFontSizeMod, setFontSizeMod)}
                </div>
            </nav>

            {/* Aparece caso o usuário não tenha consentido ainda */}
            { !userSettings?.cookieConsent && popupText &&
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