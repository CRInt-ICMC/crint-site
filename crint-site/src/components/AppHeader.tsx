// COMPONENTES
import { ReactNode, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DEFAULT_LANGUAGE, FONTE_MAXIMA, FONTE_MINIMA, AVAILABLE_LANGUAGES } from '../utils/appConstants';
import { saveSettings, updateUserConfig } from '../utils/utils';
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
import { ApiHeaderHeader } from '../utils/generated/contentTypes';

const logos = () => (
    <span className='logos'>
        <a href="https://www.icmc.usp.br/"><img className='logo-icmc' alt='Link ICMC' src={ICMC_BRANCO} /></a>

        <Link to={'/'}><img className='logo-crint' alt='Link Página Principal' src={CRINT_BRANCO} /></Link>
    </span>
);

const topics = (dictionary : ApiHeaderHeader, fontSizeMod : number) => {
    // Subtópicos de cada tópico
    let mobilidadeBody : ReactNode = (
        <span className='subtopics'>
            <Link to={'mobilidade/aluno'}> {'>'} {String(dictionary?.attributes.Alunos)} </Link>
            <Link to={'mobilidade/professor'}> {'>'} {String(dictionary?.attributes.Professores)} </Link>
            <Link to={'mobilidade/servidor'}> {'>'} {String(dictionary?.attributes.Servidores)} </Link>
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
                head={<Link to={'mobilidade'}> {String(dictionary?.attributes.Mobilidade)} </Link>} 
                body={mobilidadeBody} 
                fontSize={fontSizeMod}
                />

            <DropDownMenu 
                head={<Link to={'estrangeiros'}> {String(dictionary?.attributes.Estrangeiros)} </Link>} 
                body={estrangeirosBody} 
                fontSize={fontSizeMod}
                />

            <DropDownMenu 
                head={<Link to={'informacoes'}> {String(dictionary?.attributes.Informacoes)} </Link>} 
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
    const [langDict, setLangDict] = useState<ApiHeaderHeader>();
    const location = useLocation();
    
    // Executa apenas uma vez quando o site é carregado
    useEffect(() => {
        axios.get('http://localhost:1337/api/header?locale=' + userConfig?.lang).then((response) => {
            setLangDict(response['data']['data'] as ApiHeaderHeader);
        })
    }, [userConfig?.lang]);

    // Executa quando troca de rota
    useEffect(()=>{
        // Sobe para o topo caso troque de página
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
    async function changeLang(lang : string) {
        // Impede o uso inapropriado da função
        if (!AVAILABLE_LANGUAGES.includes(lang)) {
            changeLang(DEFAULT_LANGUAGE);
            return;
        }

        // Atualiza as variáveis que dependem da língua atual
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
                    {langDict && topics(langDict, currentFontSizeMod)}
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