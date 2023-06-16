// CSS
import './AppHeader.css'
// Imagens
import icmc from '../img/icmc.png'
import usp from '../img/usp.png'
import crint from '../img/crint.png'
import en_flag from '../img/english-flag.png'
import es_flag from '../img/spanish-flag.png'

const logos = () => {
    return (
    <span className='logos'>
        <img className='logo-usp' alt='' src={usp} />
        <img className='logo-icmc' alt='' src={icmc} />
        <img className='logo-crint' alt='' src={crint} />
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
    return (
        <span className='flags'>
            <img className='en-flag' alt='' src={en_flag} />
            <img className='es-flag' alt='' src={es_flag} />
        </span>
    );
}

const AppHeader = () => {
    return (
        <nav className='AppHeader'>
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
    );
}

export default AppHeader;