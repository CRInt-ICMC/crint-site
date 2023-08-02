import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { EMAIL, TELEFONE } from '../utils/appImages';
import './AppFooter.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AppFooter = () => {
    return (
    <footer>
        <nav className='footer'>
                <div className='footer-left'>
                    <p>Avenida Trabalhador São-carlense, 400 - Centro CEP: 13566-590 - São Carlos - SP</p>
                </div>

                <div className='footer-center' role='navigation'>
                </div>

                <div className='footer-right'>
                    <div><FontAwesomeIcon icon={faEnvelope} /> crint@icmc.usp.br</div>
                    <div><FontAwesomeIcon icon={faPhone} /> 3373-8109</div>
                </div>
            </nav>
    </footer>
    );
}

export default AppFooter;