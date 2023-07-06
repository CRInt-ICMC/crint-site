// COMPONENTES
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
// CSS
import './AppHeader.css';
// IMAGENS
import { ICMC_BRANCO, BANDEIRA_PT, BANDEIRA_EN, CRINT_BRANCO } from '../utils/appImages';
import { mountURL, loadLanguage, updateParams } from '../utils/utils';
import { useEffect, useState } from 'react';
import { DEFAULT_LANGUAGE, LANGUAGES_AVAILABLE } from '../utils/appConstants';


const logos = (search : string) => {
    return (
    <span className='logos'>
        <a href="https://www.icmc.usp.br/"><img className='logo-icmc' alt='Link ICMC' src={ICMC_BRANCO} /></a>
        <Link to={'/' + search}><img className='logo-crint' alt='Link Página Principal' src={CRINT_BRANCO} /></Link>
    </span>
    );
}

const topics = (search : string) => {
    return (
        <span className='topics'>
            <div className='linha'>
                <Link to={'graduacao' + search}> GRADUAÇÃO </Link>
                <Link to={'mobilidade' + search}> MOBILIDADE USP </Link>
                <Link to={'estrangeiros' + search}> ESTRANGEIROS </Link>
            </div>
            <div className='linha'>
                <Link to={'convenios' + search}> CONVÊNIOS </Link>
                <Link to={'informacoes' + search}> INFORMAÇÕES </Link>
            </div>
        </span>
    );
}

const languages = (currentLang : string, base : string, parameters : URLSearchParams) => {
    const langDescs = [
        {id: 'pt', alt: 'Mudar para português', flag: BANDEIRA_PT},
        {id: 'en', alt: 'Change to English', flag: BANDEIRA_EN},
    ];
    
    return (
        <span className='flags'>
            { // Adiciona bandeiras de todas as linguagens, exceto a linguagem atual
            langDescs.map((desc) => {
                if (desc.id !== currentLang) {
                    parameters = updateParams(parameters, [['lang', desc.id]])
                    const currentURL = mountURL(base, parameters);

                    return (<Link key={desc.id} to={currentURL}><img alt={desc.alt} src={desc.flag} /></Link>)
                }
            })}
        </span>
    );
}

const AppHeader = () => {
    // Hooks    
    const location = useLocation();
    const navigate = useNavigate();
    const [currentLang, setLang] = useState('');

    // Pega a URL atual da página
    const base = location.pathname;
    const search = location.search;
    const parameters = new URLSearchParams(search);

    // Executa apenas quando a página carrega, se for nulo, deixa vazio
    let langParam = localStorage.getItem('lang') || '';

    useEffect(() => {
        // Se o valor anteriormente armazenado é inválido ou não existe, usa a linguagem padrão
        if (!LANGUAGES_AVAILABLE.includes(langParam)) {
            localStorage.setItem('lang', DEFAULT_LANGUAGE);
            setLang(DEFAULT_LANGUAGE);
            loadLanguage(DEFAULT_LANGUAGE)
        } 

        // Se houve mudança na língua, atualiza os valores e a página
        else if (langParam !== currentLang) {
            localStorage.setItem('lang', langParam);
            setLang(langParam);
            loadLanguage(langParam);
        }
    })

    return (
        <header className='header-root'>
            <nav className='navbar'>
                <div className='navbar-left'>
                    {logos(search)}
                </div>

                <div className='navbar-center' role='navigation'>
                    {topics(search)}
                </div>

                <div className='navbar-right'>
                    {languages(currentLang, base, parameters)}
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;