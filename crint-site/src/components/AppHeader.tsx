// COMPONENTES
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
// CSS
import './AppHeader.css';
// IMAGENS
import { ICMC_BRANCO } from '../utils/appImages';
import { CRINT_BRANCO } from '../utils/appImages';
import { BANDEIRA_EN } from '../utils/appImages';


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

const languages = (currentURL : string) => {
    return (
        <span className='flags'>
            <a href={currentURL + '?lang=en'}><img className='en-flag' alt='Mudar para inglês' src={BANDEIRA_EN} /></a>
        </span>
    );
}

const AppHeader = () => {
    // Pega a URL atual da página
    const location = useLocation();
    const currentURL = location.pathname;
    const search = location.search

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
                    {languages(currentURL)}
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;