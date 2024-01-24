// This file is part of CRInt-site.

// CRInt-site is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// CRInt-site is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with CRInt-site. If not, see <https://www.gnu.org/licenses/>.

import { useEffect, useState } from 'react';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { STRAPI_API_TOKEN, STRAPI_URL } from '../utils/constants';
import { useLoading, useSettings } from '../utils/utils';
import { ApiFooter } from '../utils/types';
import { readCache, setCache } from '../Caching';
import { useMediaPredicate } from 'react-media-hook';
import axios from 'axios';
import './AppFooter.scss'

const AppFooter = () => {
    const { userSettings } = useSettings();
    const { addLoadingCoins, subLoadingCoins } = useLoading();
    const [footerData, setFooterData] = useState<ApiFooter>();
    const mobile = useMediaPredicate("(orientation: portrait)");

    // Executa apenas uma vez quando o site é carregado
    useEffect(() => {
        const cacheFooter = readCache('footer' + '-' + userSettings.lang);

        if (cacheFooter)
            setFooterData(cacheFooter);

        else {
            addLoadingCoins();

            axios
                .get(STRAPI_URL + '/api/footer?locale=' + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const data = response['data']['data'] as ApiFooter;
                    setFooterData(response['data']['data'] as ApiFooter);
                    setCache('footer' + '-' + userSettings.lang, data);
                    subLoadingCoins();
                })
        }
    }, [userSettings.lang]);

    return (
        <footer>
            {footerData &&
                <nav className='footer' style={{ color: String(footerData.attributes.Cor_texto), background: String(footerData.attributes.Cor_fundo)}}>
                    {
                        !mobile
                            ? <div className='footer-row'>
                                {/* ENDEREÇO */}
                                <div className='footer-left'>
                                    <h3> {String(footerData.attributes.Endereco_titulo)} </h3>
                                    <p> {String(footerData.attributes.Endereco_texto)} </p>
                                </div>

                                {/* REDES SOCIAIS */}
                                <div className='footer-center' role='navigation'>
                                    <h3> {String(footerData.attributes.Redes_sociais)} </h3>
                                    <a href={String(footerData.attributes.Instagram_link)}><FontAwesomeIcon icon={faInstagram} /> Instagram </a> <br />
                                    <a href={String(footerData.attributes.Telegram_link)}><FontAwesomeIcon icon={faTelegram} /> Telegram </a> <br />
                                    <a href={String(footerData.attributes.Github_link)}><FontAwesomeIcon icon={faGithub} /> Github </a>
                                </div>

                                {/* CONTATO */}
                                <div className='footer-right'>
                                    <h3> {String(footerData.attributes.Contato_titulo)} </h3>
                                    <a href={'mailto:' + String(footerData.attributes.Contato_email)}><FontAwesomeIcon icon={faEnvelope} /> {String(footerData.attributes.Contato_email)} </a> <br />
                                    <a href={'tel:' + String(footerData.attributes.Contato_numero)}><FontAwesomeIcon icon={faPhone} /> {String(footerData.attributes.Contato_numero)} </a>
                                </div>
                            </div>

                            : <>
                                <div className='footer-row'>
                                    {/* ENDEREÇO */}
                                    <div>
                                        <h3> {String(footerData.attributes.Endereco_titulo)} </h3>
                                        <p className='text'> {String(footerData.attributes.Endereco_texto)} </p>
                                    </div>
                                </div>

                                <div className='footer-row'>
                                    {/* REDES SOCIAIS */}
                                    <div className='footer-left' role='navigation'>
                                        <h3> {String(footerData.attributes.Redes_sociais)} </h3>
                                        <a className='text' href={String(footerData.attributes.Instagram_link)}><FontAwesomeIcon icon={faInstagram} /> Instagram </a> <br />
                                        <a className='text' href={String(footerData.attributes.Telegram_link)}><FontAwesomeIcon icon={faTelegram} /> Telegram </a> <br />
                                        <a className='text' href={String(footerData.attributes.Github_link)}><FontAwesomeIcon icon={faGithub} /> Github </a>
                                    </div>

                                    {/* CONTATO */}
                                    <div className='footer-right'>
                                        <h3> {String(footerData.attributes.Contato_titulo)} </h3>
                                        <a className='text' href={'mailto:' + String(footerData.attributes.Contato_email)}><FontAwesomeIcon icon={faEnvelope} /> {String(footerData.attributes.Contato_email)} </a> <br />
                                        <a className='text' href={'tel:' + String(footerData.attributes.Contato_numero)}><FontAwesomeIcon icon={faPhone} /> {String(footerData.attributes.Contato_numero)} </a>
                                    </div>
                                </div>
                            </>
                    }

                    <div className='footer-row'>
                        <div><Link to={'/creditos'}>{String(footerData.attributes.Creditos)}</Link ></div>
                        <div><Link to={'/privacidade'}>{String(footerData.attributes.Politica_privacidade)}</Link ></div>
                    </div>
                </nav>
            }
        </footer>
    );
}

export default AppFooter;