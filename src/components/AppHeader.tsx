// Componentes
import { useLocation } from 'react-router-dom'
// CSS
import './AppHeader.css'
// Imagens
import icmc from '../img/icmc-logo.png'
import usp from '../img/usp-logo.png'
import crint from '../img/crint-logo.png'
import en_flag from '../img/english-flag.png'
import es_flag from '../img/spanish-flag.png'
import { Link } from 'react-router-dom'

const logos = () => {
    return (
    <span className='logos'>
        <a href="https://www5.usp.br/"><img className='logo-usp' alt='' src={usp} /></a>
        <a href="https://www.icmc.usp.br/"><img className='logo-icmc' alt='' src={icmc} /></a>
        <Link to='/'><img className='logo-crint' alt='' src={crint} /></Link>
    </span>
    );
}

const topics = () => {
    return (
        <span className='topics'>
            <div className='linha'>
                <span> L1T1 </span>
                <span> L1T2 </span>
                <span> L1T3 </span>
                <span> L1T4 </span>
                <span> L1T5 </span>
            </div>
            <div className='linha'>
                <span> L2T1 </span>
                <span> L2T2 </span>
                <span> L2T3 </span>
                <span> L2T4 </span>
                <span> L2T5 </span>
            </div>
        </span>
    );
}

const languages = () => {
    // const location = useLocation();
    // const currentURL = 
    
    return (
        <span className='flags'>
            <img className='en-flag' alt='' src={en_flag} />
            <img className='es-flag' alt='' src={es_flag} />
        </span>
    );
}

const AppHeader = () => {
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
                    {languages()}
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;