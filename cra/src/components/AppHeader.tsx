// COMPONENTES
import { useLocation } from 'react-router-dom'
// CSS
import './AppHeader.css'
// IMAGENS
// import usp from '../img/usp-logo.png'
import icmc from '../img/icmc-logo-completo-b.png'
import crint from '../img/crint-logo.png'
import en_flag from '../img/english-flag.png'
// import es_flag from '../img/spanish-flag.png'
import { Link } from 'react-router-dom'

const logos = () => {
    return (
    <span className='logos'>
        {/* <a href="https://www5.usp.br/"><img className='logo-usp' alt='' src={usp} /></a> */}
        <a href="https://www.icmc.usp.br/"><img className='logo-icmc' alt='Link ICMC' src={icmc} /></a>
        <Link to='/'><img className='logo-crint' alt='Link Página Principal' src={crint} /></Link>
    </span>
    );
}

const topics = () => {
    return (
        <span className='topics'>
            <div className='linha'>
                <Link to='graduacao'> GRADUAÇÃO </Link>
                <Link to='mobilidade'> MOBILIDADE USP </Link>
                <Link to='estrangeiros'> ESTRANGEIROS </Link>
            </div>
            <div className='linha'>
                <Link to='convenios'> CONVÊNIOS </Link>
                <Link to='informacoes'> INFORMAÇÕES </Link>
            </div>
        </span>
    );
}

const languages = (currentURL : string) => {
    return (
        <span className='flags'>
            <a href={currentURL + '?lang=en'}><img className='en-flag' alt='Mudar para inglês' src={en_flag} /></a>
            {/* <a href={currentURL}><img className='es-flag' alt='' src={es_flag} /></a> */}
        </span>
    );
}

const AppHeader = () => {
    // Pega a URL atual da página
    const location = useLocation();
    const currentURL = location.pathname;

    return (
        <header className='header-root'>
            <nav className='navbar'>
                <div className='navbar-left'>
                    {logos()}
                </div>

                <div className='navbar-center' role='navigation'>
                    {topics()}
                </div>

                <div className='navbar-right'>
                    {languages(currentURL)}
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;