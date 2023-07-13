// COMPONENTES
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
// CSS
import './AppHeader.css';
// IMAGENS
import { ICMC_BRANCO, BANDEIRA_PT, BANDEIRA_EN, CRINT_BRANCO } from '../utils/appImages';
import { loadLanguage } from '../utils/utils';
import { useEffect, useState } from 'react';
import { DEFAULT_LANGUAGE, LANGUAGES_AVAILABLE } from '../utils/appConstants';
// import Graduacao from '../pages/graduacao';

const logos = (search : string) => {
    return (
    <span className='logos'>
        <a href="https://www.icmc.usp.br/"><img className='logo-icmc' alt='Link ICMC' src={ICMC_BRANCO} /></a>
        <Link to={'/' + search}><img className='logo-crint' alt='Link Página Principal' src={CRINT_BRANCO} /></Link>
    </span>
    );
}

const topics = (search : string, dictionary : languageDictionary) => {


    return (
        <span className='topics'>
            <div className='linha'> {/* VOLTAR PARA MELHORAR ISSO MAIS TARDE */}
                <Link to={'graduacao' + search}> {dictionary.header?.graduacao} </Link>
                <Link to={'mobilidade' + search}> {dictionary.header?.mobilidade} </Link>
                <Link to={'estrangeiros' + search}> {dictionary.header?.estrangeiros} </Link>
            </div>
            <div className='linha'>
                <Link to={'convenios' + search}> {dictionary.header?.convenios} </Link>
                <Link to={'informacoes' + search}> {dictionary.header?.informacoes} </Link>
            </div>
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
                    return (<button key={desc.id} onClick={() => setLang(desc.id)}><img alt={desc.alt} src={desc.flag} /></button>)
                }
            })}
        </span>
    );
}

const AppHeader = () => {
    // Hooks    
    const location = useLocation();
    const [currentLang, setLang] = useState('');
    const [langDict, setLangDict] = useState<languageDictionary>(loadLanguage(DEFAULT_LANGUAGE));

    // Pega a URL atual da página
    const search = location.search;

    // Executa apenas quando a página carrega, se for nulo, deixa vazio
    let langParam = localStorage.getItem('lang') || '';

    useEffect(() => {
        // Se o valor anteriormente armazenado é inválido ou não existe, usa língua padrão
        if (!LANGUAGES_AVAILABLE.includes(langParam)) {
            changeLang(DEFAULT_LANGUAGE);
        } 

        // Se houve mudança na língua, atualiza os valores e a página
        else if (langParam !== currentLang) {
            changeLang(langParam);
        }
    }, [currentLang])

    // Carrega o novo dicionário de linguagem
    const changeLang = (lang : string) => {
        // Impede o uso inapropriado da função
        if (!LANGUAGES_AVAILABLE.includes(lang)) {
            console.log('Língua desconhecida!')
            return;
        }

        localStorage.setItem('lang', lang);
        setLang(lang);
        setLangDict(loadLanguage(lang))
    }

    return (
        <header className='header-root'>
            <nav className='navbar'>
                <div className='navbar-left'>
                    {logos(search)}
                </div>

                <div className='navbar-center' role='navigation'>
                    {topics(search, langDict)}
                </div>

                <div className='navbar-right'>
                    {languages(currentLang, changeLang)}
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;