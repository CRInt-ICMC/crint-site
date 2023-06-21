// COMPONENTES
import { useLocation } from 'react-router-dom'
// CSS
import './AppHeader.css'
// IMAGENS
// import usp from '../img/usp-logo.png'
import icmc from '../img/icmc-logo-completo.png'
import crint from '../img/crint-logo.png'
import en_flag from '../img/english-flag.png'
// import es_flag from '../img/spanish-flag.png'
import { Link } from 'react-router-dom'

const logos = () => {
    return (
    <span className='logos'>
        {/* <a href="https://www5.usp.br/"><img className='logo-usp' alt='' src={usp} /></a> */}
        <a href="https://www.icmc.usp.br/"><img className='logo-icmc' alt='' src={icmc} /></a>
        <Link to='/'><img className='logo-crint' alt='' src={crint} /></Link>
    </span>
    );
}

const topics = () => {
    return (
        <span className='topics'>
            <div className='linha'>
                <a href='http://localhost:3000'> GRADUAÇÃO </a>
                <a href='http://localhost:3000'> PÓS-GRADUAÇÃO </a>
                <a href='http://localhost:3000'> PESQUISA </a>
            </div>
            <div className='linha'>
                <a href='http://localhost:3000'> CULTURA E EXTENSÃO </a>
                <a href='http://localhost:3000'> INCLUSÃO E PERTENCIMENTO </a>
            </div>
        </span>
    );
}

const languages = (currentURL : string) => {
    return (
        <span className='flags'>
            <a href={currentURL + '?lang=en'}><img className='en-flag' alt='' src={en_flag} /></a>
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

                <div className='navbar-center'>
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