import { useContext, useEffect, useState } from 'react';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SettingsContext } from '../Contexto';
import { ApiFooterFooter } from '../utils/generated/contentTypes';
import { STRAPI_API_TOKEN, STRAPI_URL } from '../utils/appConstants';
import './AppFooter.scss'

const AppFooter = () => {
    const { userSettings } = useContext(SettingsContext);
    const [textData, setTextData] = useState<ApiFooterFooter>();

    // Executa apenas uma vez quando o site é carregado
    useEffect(() => {
        axios
            .get(STRAPI_URL + '/api/footer?locale=' + userSettings?.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
            .then((response) => {
                setTextData(response['data']['data'] as ApiFooterFooter);
            })
    }, [userSettings?.lang]);

    return (
        <footer>
            {textData &&
                <nav className='footer' >
                    <div className='footer-row' style={{ fontSize: (userSettings?.fontSizeMod || 1) + 'em' }}>
                        {/* ENDEREÇO */}
                        <div className='footer-left'>
                            <h3> {String(textData?.attributes.Endereco_titulo)} </h3>
                            <p> {String(textData?.attributes.Endereco_texto)} </p>
                        </div>

                        {/* REDES SOCIAIS */}
                        <div className='footer-center' role='navigation'>
                            <h3> {String(textData?.attributes.Redes_sociais)} </h3>
                            <a href={String(textData?.attributes.Instagram_link)}><FontAwesomeIcon icon={faInstagram} /> Instagram </a> <br />
                            <a href={String(textData?.attributes.Telegram_link)}><FontAwesomeIcon icon={faTelegram} /> Telegram </a> <br />
                            <a href={String(textData?.attributes.Github_link)}><FontAwesomeIcon icon={faGithub} /> Github </a>
                        </div>

                        {/* CONTATO */}
                        <div className='footer-right'>
                            <h3> {String(textData?.attributes.Contato_titulo)} </h3>
                            <a href={'mailto:' + String(textData?.attributes.Contato_email)}><FontAwesomeIcon icon={faEnvelope} /> {String(textData?.attributes.Contato_email)} </a> <br />
                            <a href={'tel:' + String(textData?.attributes.Contato_numero)}><FontAwesomeIcon icon={faPhone} /> {String(textData?.attributes.Contato_numero)} </a>
                        </div>
                    </div>
                    <div className='footer-row' style={{ fontSize: (userSettings?.fontSizeMod || 1) + 'em' }}>
                        <div><Link to={'/creditos'}>{String(textData?.attributes.Creditos)}</Link ></div>
                        <div><Link to={'/privacidade'}>{String(textData?.attributes.Politica_privacidade)}</Link ></div>
                    </div>
                </nav>
            }
        </footer>
    );
}

export default AppFooter;