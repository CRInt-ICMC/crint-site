import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import './AppFooter.css'

const AppFooter = () => {
    return (
    <footer>
        <nav className='footer'>
                <div className='footer-left'>
                    <h3>Endereço</h3>
                    <p>Avenida Trabalhador São-carlense, 400 - Centro CEP: 13566-590 - São Carlos - SP</p>
                </div>

                <div className='footer-center' role='navigation'>
                    <h3>Redes sociais</h3>
                    <div><FontAwesomeIcon icon={faInstagram} /> crint.icmc</div>
                    <div><FontAwesomeIcon icon={faTelegram} /> crint.icmc</div>
                </div>

                <div className='footer-right'>
                    <h3>Contato</h3>
                    <div><FontAwesomeIcon icon={faEnvelope} /> crint@icmc.usp.br</div>
                    <div><FontAwesomeIcon icon={faPhone} /> 3373-8109</div>
                </div>
            </nav>
    </footer>
    );
}

export default AppFooter;