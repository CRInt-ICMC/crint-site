import { useContext, useEffect, useState } from 'react';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ConfigContext } from '../Context';
import { ApiFooterFooter } from '../utils/generated/contentTypes';
import './AppFooter.scss'

const AppFooter = () => {
    const {userConfig} = useContext(ConfigContext);
    const [langDict, setLangDict] = useState<ApiFooterFooter>();

    // Executa apenas uma vez quando o site é carregado
    useEffect(() => {
        axios.get('http://localhost:1337/api/footer?locale=' + userConfig?.lang).then((response) => {
            setLangDict(response['data']['data'] as ApiFooterFooter);
        })
    }, [userConfig?.lang]);

    return (
        <footer style={{fontSize: (userConfig?.fontSizeMod || 1) + 'em'}}>
            <nav className='footer'>
                <div className='footer-row'>
                    {/* ENDEREÇO */}
                    <div className='footer-left'>
                        <h3> {String(langDict?.attributes.Endereco_titulo)} </h3>
                        <p> {String(langDict?.attributes.Endereco_texto)} </p>
                    </div>

                    {/* REDES SOCIAIS */}
                    <div className='footer-center' role='navigation'>
                        <h3> {String(langDict?.attributes.Redes_sociais)} </h3>
                        <a href={String(langDict?.attributes.Instagram_link)}><FontAwesomeIcon icon={faInstagram} /> Instagram </a> <br/>
                        <a href={String(langDict?.attributes.Telegram_link)}><FontAwesomeIcon icon={faTelegram} /> Telegram </a> <br/>
                        <a href={String(langDict?.attributes.Github_link)}><FontAwesomeIcon icon={faGithub} /> Github </a>
                    </div>

                    {/* CONTATO */}
                    <div className='footer-right'>
                        <h3> {String(langDict?.attributes.Contato_titulo)} </h3>
                        <a href={'mailto:' + String(langDict?.attributes.Contato_email)}><FontAwesomeIcon icon={faEnvelope} /> {String(langDict?.attributes.Contato_email)} </a> <br/>
                        <a href={'tel:'+ String(langDict?.attributes.Contato_numero)}><FontAwesomeIcon icon={faPhone} /> {String(langDict?.attributes.Contato_numero)} </a>
                    </div>
                </div>
                <div className='footer-row'><Link to={'/creditos'}>Créditos do desenvolvimento do site</Link ></div>
            </nav>
        </footer>
    );
}

export default AppFooter;