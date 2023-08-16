// COMPONENTES
import { ReactNode, useContext, useEffect, useState } from 'react';
import { loadLanguage, loadSettings, saveSettings } from '../utils/utils';
import { Link } from 'react-router-dom';
import DropDownMenu from './DropDownMenu';
import { ConfigContext } from '../Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';// Constantes
import { DEFAULT_LANGUAGE, FONTE_MAXIMA, FONTE_MINIMA, LANGUAGES_AVAILABLE } from '../utils/appConstants';
// CSS
import './AppHeader.scss';
// IMAGENS
import { ICMC_BRANCO, BANDEIRA_PT, BANDEIRA_EN, CRINT_BRANCO, CRINT_COLORIDO } from '../utils/appImages';

const logos = (search : string) => {
    return (
    <span className='logos'>
        <a href="https://www.icmc.usp.br/"><img className='logo-icmc' alt='Link ICMC' src={ICMC_BRANCO} /></a>
        <Link to={'/' + search}>
            <img className='logo-crint' alt='Link Página Principal' src={CRINT_BRANCO} 
                onMouseOver={(e)=>{e.currentTarget.src = CRINT_COLORIDO}} 
                onMouseLeave={(e)=>{e.currentTarget.src = CRINT_BRANCO}} />
            </Link>
    </span>
    );
}

const topics = (search : string, dictionary : languageDictionary, fontSizeMod : number) => {
    let mobilidadeBody : ReactNode = (
        <span className='subtopics'>
            <Link to={'mobilidade/aluno' + search}> {'>'} {dictionary.header?.mobilidade?.aluno} </Link>
            <Link to={'mobilidade/professor' + search}> {'>'} {dictionary.header?.mobilidade?.professor} </Link>
            <Link to={'mobilidade/servidor' + search}> {'>'} {dictionary.header?.mobilidade?.servidor} </Link>
        </span>
    );

    let estrangeirosBody : ReactNode = (
        <span className='subtopics'>
            <Link to={'estrangeiros/guias' + search}> {'>'} {dictionary.header?.estrangeiros?.guias} </Link>
        </span>
    );

    let informacoesBody : ReactNode = (
        <span className='subtopics'>
            <Link to={'informacoes/convenios' + search}> {'>'} {dictionary.header?.informacoes?.convenios} </Link>
            <Link to={'informacoes/dia' + search}> {'>'} {dictionary.header?.informacoes?.dia} </Link>
            <Link to={'informacoes/pesquisa' + search}> {'>'} {dictionary.header?.informacoes?.pesquisa} </Link>
        </span>
    );

    return (
        <span className='topics' style={{fontSize: fontSizeMod + 'em'}}>
            <DropDownMenu 
                head={<Link to={'mobilidade' + search}> {dictionary.header?.mobilidade?.titulo} </Link>} 
                body={mobilidadeBody} 
                fontSize={fontSizeMod}
                />

            <DropDownMenu 
                head={<Link to={'estrangeiros' + search}> {dictionary.header?.estrangeiros?.titulo} </Link>} 
                body={estrangeirosBody} 
                fontSize={fontSizeMod}
                />

            <DropDownMenu 
                head={<Link to={'informacoes' + search}> {dictionary.header?.informacoes?.titulo} </Link>} 
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

const options = (currentFontSizeMod : number, setFontSizeMod : CallableFunction) => {


    return (
        <div className='options'>
            {currentFontSizeMod < FONTE_MAXIMA && <button className='increase-button' onClick={() => setFontSizeMod(currentFontSizeMod + 0.1)}><FontAwesomeIcon icon={faPlus} /></button>}
            {currentFontSizeMod > FONTE_MINIMA && <button className='decrease-button' onClick={() => setFontSizeMod(currentFontSizeMod - 0.1)}><FontAwesomeIcon icon={faMinus} /></button>}
        </div>
    )
}

const AppHeader = () => {
    // Hooks    
    const {userConfig, setUserConfig} = useContext(ConfigContext);
    const [currentLang, setLang] = useState(userConfig?.lang || DEFAULT_LANGUAGE);
    const [currentFontSizeMod, setFontSizeMod] = useState(userConfig?.fontSizeMod || 1);
    const [langDict, setLangDict] = useState<languageDictionary>(loadLanguage(currentLang || DEFAULT_LANGUAGE));

    // Pega a URL atual da página
    const search = location.search;

    useEffect(() => {
        if (!userConfig?.lang) {
            changeLang(DEFAULT_LANGUAGE);
        }

        // Se houve mudança na língua, atualiza os valores e a página
        else if (userConfig.lang !== currentLang) {
            changeLang(currentLang);
        }
    }, [currentLang]);

    // Carrega o novo dicionário de linguagem
    const changeLang = (lang : string) => {
        // Impede o uso inapropriado da função
        if (!LANGUAGES_AVAILABLE.includes(lang)) {
            console.log('Língua desconhecida!\nMudando para o padrão.')
            changeLang(DEFAULT_LANGUAGE);
            return;
        }

        localStorage.setItem('lang', lang);
        setLang(lang);
        setLangDict(loadLanguage(lang));

        if (setUserConfig !== undefined)
            setUserConfig({lang: lang, fontSizeMod: currentFontSizeMod});            
    }

    // Esse bloco lida com o tamanho da fonte    
    useEffect(() => {
        if (!userConfig?.fontSizeMod) {
            changeFontSizeMod(1);
        }

        else if (userConfig.fontSizeMod !== currentFontSizeMod) {
            changeFontSizeMod(currentFontSizeMod);
        }
    }, [currentFontSizeMod]);

    const changeFontSizeMod = (fontSizeMod : number) => {
        // Impede o uso inapropriado da função
        if (fontSizeMod < FONTE_MINIMA) {
            changeFontSizeMod(FONTE_MINIMA);
            return;
        }

        else if (fontSizeMod > FONTE_MAXIMA) {
            changeFontSizeMod(FONTE_MAXIMA);
            return;
        }

        localStorage.setItem('font', String(fontSizeMod));
        setFontSizeMod(fontSizeMod);

        if (setUserConfig !== undefined)
            setUserConfig({lang: currentLang, fontSizeMod: fontSizeMod});
    }

    console.log("salvo", loadSettings());
    if (userConfig)
        saveSettings(userConfig);
    

    return (
        <header className='header-root'>
            <nav className='navbar'>
                <div className='navbar-left'>
                    {logos(search)}
                </div>

                <div className='navbar-center' role='navigation'>
                    {topics(search, langDict, currentFontSizeMod || 1)}
                </div>

                <div className='navbar-right'>
                    {languages(currentLang, changeLang)}
                    {options(currentFontSizeMod, setFontSizeMod)}
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;