import { useEffect, useState } from 'react';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { STRAPI_API_TOKEN, STRAPI_URL } from '../utils/constants';
import { useLoading, useSettings } from '../utils/utils';
import { ApiFooter } from '../utils/types';
import { readCache, setCache } from '../Caching';
import axios from 'axios';
import './AppFooter.scss'

const AppFooter = () => {
    const { userSettings } = useSettings();
    const { addLoadingCoins, subLoadingCoins } = useLoading();
    const [textData, setFooterText] = useState<ApiFooter>();

    // Executa apenas uma vez quando o site é carregado
    useEffect(() => {
        const cacheFooter = readCache('footer' + '-' + userSettings.lang);

        if (cacheFooter)
            setFooterText(cacheFooter);

        else {
            addLoadingCoins();

            axios
                .get(STRAPI_URL + '/api/footer?locale=' + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const data = response['data']['data'] as ApiFooter;
                    setFooterText(response['data']['data'] as ApiFooter);
                    setCache('footer' + '-' + userSettings.lang, data);
                    subLoadingCoins();
                })
        }
    }, [userSettings.lang]);

    return (
        <footer>
            {textData &&
                <nav className='footer' >
                    <div className='footer-row'>
                        {/* ENDEREÇO */}
                        <div className='footer-left'>
                            <h3> {String(textData.attributes.Endereco_titulo)} </h3>
                            <p> {String(textData.attributes.Endereco_texto)} </p>
                        </div>

                        {/* REDES SOCIAIS */}
                        <div className='footer-center' role='navigation'>
                            <h3> {String(textData.attributes.Redes_sociais)} </h3>
                            <a href={String(textData.attributes.Instagram_link)}><FontAwesomeIcon icon={faInstagram} /> Instagram </a> <br />
                            <a href={String(textData.attributes.Telegram_link)}><FontAwesomeIcon icon={faTelegram} /> Telegram </a> <br />
                            <a href={String(textData.attributes.Github_link)}><FontAwesomeIcon icon={faGithub} /> Github </a>
                        </div>

                        {/* CONTATO */}
                        <div className='footer-right'>
                            <h3> {String(textData.attributes.Contato_titulo)} </h3>
                            <a href={'mailto:' + String(textData.attributes.Contato_email)}><FontAwesomeIcon icon={faEnvelope} /> {String(textData.attributes.Contato_email)} </a> <br />
                            <a href={'tel:' + String(textData.attributes.Contato_numero)}><FontAwesomeIcon icon={faPhone} /> {String(textData.attributes.Contato_numero)} </a>
                        </div>
                    </div>
                    <div className='footer-row'>
                        <div><Link to={'/creditos'}>{String(textData.attributes.Creditos)}</Link ></div>
                        <div><Link to={'/privacidade'}>{String(textData.attributes.Politica_privacidade)}</Link ></div>
                    </div>
                </nav>
            }
        </footer>
    );
}

export default AppFooter;