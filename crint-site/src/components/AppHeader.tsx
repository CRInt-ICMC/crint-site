// COMPONENTES
import { ReactNode, useEffect, useState } from 'react';
import { loadLanguage } from '../utils/utils';
import { useLocation, Link } from 'react-router-dom';
import DropDownMenu from './DropDownMenu';
// Constantes
import { DEFAULT_LANGUAGE, LANGUAGES_AVAILABLE } from '../utils/appConstants';
// CSS
import './AppHeader.css';
// IMAGENS
import { ICMC_BRANCO, BANDEIRA_PT, BANDEIRA_EN, CRINT_BRANCO } from '../utils/appImages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const logos = (search : string) => {
    return (
    <span className='logos'>
        <a href="https://www.icmc.usp.br/"><img className='logo-icmc' alt='Link ICMC' src={ICMC_BRANCO} /></a>
        <Link to={'/' + search}><img className='logo-crint' alt='Link Página Principal' src={CRINT_BRANCO} /></Link>
    </span>
    );
}

const topics = (search : string, dictionary : languageDictionary) => {
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
        <span className='topics'>
            <DropDownMenu 
                head={<Link to={'mobilidade' + search}> {dictionary.header?.mobilidade?.titulo} </Link>} 
                body={mobilidadeBody} 
                />

            <DropDownMenu 
                head={<Link to={'estrangeiros' + search}> {dictionary.header?.estrangeiros?.titulo} </Link>} 
                body={estrangeirosBody} 
                />

            <DropDownMenu 
                head={<Link to={'informacoes' + search}> {dictionary.header?.informacoes?.titulo} </Link>} 
                body={informacoesBody} 
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

const options = () => {
    return (
        <span className='options'>
            <button><FontAwesomeIcon icon={faPlus} /></button>
            <button><FontAwesomeIcon icon={faMinus} /></button>
            <button><FontAwesomeIcon icon={faCircleHalfStroke} /></button>
        </span>
    )
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
                    {options()}
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;