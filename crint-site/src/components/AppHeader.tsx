// COMPONENTES
import { ReactNode, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DEFAULT_LANGUAGE, FONTE_MAXIMA, FONTE_MINIMA, LANGUAGES_AVAILABLE } from '../utils/appConstants';
import { loadLanguage, saveSettings, updateUserConfig } from '../utils/utils';
import { ConfigContext } from '../Context';
import DropDownMenu from './DropDownMenu';
// CSS
import './AppHeader.scss';
// IMAGENS E ÍCONES
import { ICMC_BRANCO, BANDEIRA_PT, BANDEIRA_EN, CRINT_BRANCO } from '../utils/appImages';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from './Popup';
import axios from 'axios';

const logos = () => (
    <span className='logos'>
        <a href="https://www.icmc.usp.br/"><img className='logo-icmc' alt='Link ICMC' src={ICMC_BRANCO} /></a>

        <Link to={'/'}><img className='logo-crint' alt='Link Página Principal' src={CRINT_BRANCO} /></Link>
    </span>
);

const topics = (dictionary : languageDictionary, fontSizeMod : number) => {
    // Subtópicos de cada tópico
    let mobilidadeBody : ReactNode = (
        <span className='subtopics'>
            <Link to={'mobilidade/aluno'}> {'>'} {dictionary.header?.mobilidade?.aluno} </Link>
            <Link to={'mobilidade/professor'}> {'>'} {dictionary.header?.mobilidade?.professor} </Link>
            <Link to={'mobilidade/servidor'}> {'>'} {dictionary.header?.mobilidade?.servidor} </Link>
        </span>
    );

    let estrangeirosBody : ReactNode = (
        <span className='subtopics'>
            <Link to={'estrangeiros/guias'}> {'>'} {dictionary.header?.estrangeiros?.guias} </Link>
        </span>
    );

    let informacoesBody : ReactNode = (
        <span className='subtopics'>
            <Link to={'informacoes/convenios'}> {'>'} {dictionary.header?.informacoes?.convenios} </Link>
            <Link to={'informacoes/dia'}> {'>'} {dictionary.header?.informacoes?.dia} </Link>
            <Link to={'informacoes/pesquisa'}> {'>'} {dictionary.header?.informacoes?.pesquisa} </Link>
        </span>
    );

    // Cria os tópicos e um menu dropdown para cada um deles
    return (
        <span className='topics' style={{fontSize: fontSizeMod + 'em'}}>
            <DropDownMenu 
                head={<Link to={'mobilidade'}> {dictionary.header?.mobilidade?.titulo} </Link>} 
                body={mobilidadeBody} 
                fontSize={fontSizeMod}
                />

            <DropDownMenu 
                head={<Link to={'estrangeiros'}> {dictionary.header?.estrangeiros?.titulo} </Link>} 
                body={estrangeirosBody} 
                fontSize={fontSizeMod}
                />

            <DropDownMenu 
                head={<Link to={'informacoes'}> {dictionary.header?.informacoes?.titulo} </Link>} 
                body={informacoesBody}
                fontSize={fontSizeMod}
                />
        </span>
    );
}

const languages = (currentLang : string, setLang : CallableFunction) => {
    const langDescs = [
        {id: 'pt', alt: 'Mudar para português', flag: BANDEIRA_PT},
        {id: 'en', alt: 'Change to English', flag: BANDEIRA_EN},
    ];
    
    return (
        <span className='flags'>
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
        </span>
    );
}

const options = (currentFontSizeMod : number, setFontSizeMod : CallableFunction) => (
    // Apenas mostra os botões se o tamanho não estiver em seu limite máximo ou mínimo
    <div className='options'>
        {currentFontSizeMod < FONTE_MAXIMA && <button className='increase-button' onClick={() => setFontSizeMod(currentFontSizeMod + 0.1)}><FontAwesomeIcon icon={faPlus} /></button>}
        {currentFontSizeMod > FONTE_MINIMA && <button className='decrease-button' onClick={() => setFontSizeMod(currentFontSizeMod - 0.1)}><FontAwesomeIcon icon={faMinus} /></button>}
    </div>
);

const cookieConsentPopup = (setConsentTrue : CallableFunction) => {
    const popupBody = () => (
        <>
            <p>Ao acessar e utilizar nosso website você concorda com nossas políticas de uilização de cookies. <Link to={'privacidade'}>Saiba mais.</Link></p>
            <button onClick={() => setConsentTrue()}>Aceito</button>
        </>
    )

    return (
        <Popup 
            head="Privacidade e Cookies" 
            body={popupBody()} 
            />
    )
}

const AppHeader = () => {
    // Hooks    
    const {userConfig, setUserConfig} = useContext(ConfigContext);
    const [currentLang, setLang] = useState(userConfig?.lang || DEFAULT_LANGUAGE);
    const [currentFontSizeMod, setFontSizeMod] = useState(userConfig?.fontSizeMod || 1);
    const [langDict, setLangDict] = useState<languageDictionary>(loadLanguage(currentLang || DEFAULT_LANGUAGE));
    const location = useLocation();

    // Sobe para o topo caso troque de página
    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [location])

    // Esse bloco lida com a língua atual
    useEffect(() => {
        if (!userConfig?.lang)
            changeLang(DEFAULT_LANGUAGE);

        // Se houve mudança na língua, atualiza os valores e a página
        else if (userConfig.lang !== currentLang)
            changeLang(currentLang);

    }, [currentLang]);

    // Carrega o novo dicionário de linguagem
    let valores = null;
    const changeLang = (lang : string) => {
        // Impede o uso inapropriado da função
        if (!LANGUAGES_AVAILABLE.includes(lang)) {
            changeLang(DEFAULT_LANGUAGE);
            return;
        }

        // Atualiza as variáveis que dependem da língua atual
        setLang(lang)
        setLangDict(loadLanguage(lang));

        if (setUserConfig && userConfig)
            setUserConfig(updateUserConfig(userConfig, {lang: lang}));            
    
        axios.get('http://localhost:1337/api/headers').then((response) => {
            valores = response['data']['data'][0]['attributes'];
            console.log(response['data']['data'][0]['attributes']);
        })
    }

    
    console.log(valores)

    // Esse bloco lida com o tamanho da fonte    
    useEffect(() => {
        if (!userConfig?.fontSizeMod)
            changeFontSizeMod(1);

        else if (userConfig.fontSizeMod !== currentFontSizeMod)
            changeFontSizeMod(currentFontSizeMod);

    }, [currentFontSizeMod]);

    const changeFontSizeMod = (fontSizeMod : number) => {
        // Impede o uso inapropriado da função
        if (fontSizeMod < FONTE_MINIMA || fontSizeMod > FONTE_MAXIMA) 
            return;

        if (setUserConfig && userConfig)
            setUserConfig(updateUserConfig(userConfig, {fontSizeMod: fontSizeMod}));
    }

    if (userConfig)
        saveSettings(userConfig);

    return (
        <header className='header-root'>
            <nav className='navbar'>
                {/* LOGOS */}
                <div className='navbar-left'>
                    {logos()}
                </div>

                {/* TÓPICOS */}
                <div className='navbar-center' role='navigation'>
                    {topics(langDict, currentFontSizeMod)}
                </div>

                {/* OPÇÕES */}
                <div className='navbar-right'>
                    {languages(currentLang, changeLang)}
                    {options(currentFontSizeMod, setFontSizeMod)}
                </div>
            </nav>

            {/* Aparece caso o usuário não tenha consentido ainda */}
            { !userConfig?.cookieConsent &&
                cookieConsentPopup( 
                    () => { 
                        if(setUserConfig && userConfig) {
                            setUserConfig(updateUserConfig(userConfig, {cookieConsent: true}))
                            saveSettings(userConfig);
                        }
                    }
                )
            }

        </header>
    );
}

export default AppHeader;