import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import './AppFooter.scss'

const AppFooter = () => {
    return (
    <footer>
        <nav className='footer'>
                <div className='footer-left'>
                    <h3> Endereço </h3>
                    <p> Avenida Trabalhador São-carlense, 400 - Centro CEP: 13566-590 - São Carlos - SP </p>
                </div>

                <div className='footer-center' role='navigation'>
                    <h3> Redes sociais </h3>
                    <a href='https://www.instagram.com/crinticmc/'><FontAwesomeIcon icon={faInstagram} /> crinticmc </a> <br/>
                    <a href='https://t.me/crinticmc'><FontAwesomeIcon icon={faTelegram} /> crinticmc </a>
                </div>

                <div className='footer-right'>
                    <h3> Contato </h3>
                    <a href='mailto:crint@icmc.usp.br'><FontAwesomeIcon icon={faEnvelope} /> crint@icmc.usp.br </a> <br/>
                    <a href='tel:3373-8109'><FontAwesomeIcon icon={faPhone} /> 3373-8109 </a>
                </div>
            </nav>
    </footer>
    );
}

export default AppFooter;