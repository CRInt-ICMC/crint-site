import { useContext } from 'react';
import { ConfigContext } from '../Context';
import { loadLanguage } from '../utils/utils';
import { DEFAULT_LANGUAGE } from '../utils/appConstants';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import './AppFooter.scss'
import { Link } from 'react-router-dom';

const AppFooter = () => {
    const {userConfig} = useContext(ConfigContext);
    const langDict : languageDictionary = loadLanguage(userConfig?.lang || DEFAULT_LANGUAGE);

    return (
        <footer style={{fontSize: (userConfig?.fontSizeMod || 1) + 'em'}}>
            <nav className='footer'>
                <div className='footer-row'>
                    {/* ENDEREÇO */}
                    <div className='footer-left'>
                        <h3> {langDict.footer.endereco} </h3>
                        <p> Avenida Trabalhador São-carlense, 400 - Centro CEP: 13566-590 - São Carlos - SP </p>
                    </div>

                    {/* REDES SOCIAIS */}
                    <div className='footer-center' role='navigation'>
                        <h3> {langDict.footer.redes} </h3>
                        <a href='https://www.instagram.com/crinticmc/'><FontAwesomeIcon icon={faInstagram} /> crinticmc </a> <br/>
                        <a href='https://t.me/crinticmc'><FontAwesomeIcon icon={faTelegram} /> crinticmc </a>
                    </div>

                    {/* CONTATO */}
                    <div className='footer-right'>
                        <h3> {langDict.footer.contato} </h3>
                        <a href='mailto:crint@icmc.usp.br'><FontAwesomeIcon icon={faEnvelope} /> crint@icmc.usp.br </a> <br/>
                        <a href='tel:3373-8109'><FontAwesomeIcon icon={faPhone} /> +55 (16) 3373-8109 </a>
                    </div>
                </div>
                <div className='footer-row'><Link to={'/creditos'}>Créditos do desenvolvimento do site</Link ></div>
            </nav>
        </footer>
    );
}

export default AppFooter;