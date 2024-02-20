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
// import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { STRAPI_API_TOKEN, STRAPI_URL } from '../utils/constants';
import { useLoading, useSettings } from '../utils/utils';
import { ApiFooter, ApiLink } from '../utils/types';
import { readCache, setCache } from '../Caching';
import { useMediaPredicate } from 'react-media-hook';
import axios from 'axios';
import './AppFooter.scss'

const AppFooter = () => {
    const { userSettings } = useSettings();
    const { addLoadingCoins, subLoadingCoins } = useLoading();
    const [footerData, setFooterData] = useState<ApiFooter>();
    const [linksContato, setLinksContato] = useState<ApiLink[]>();
    const [linksRedesSociais, setLinksRedesSociais] = useState<ApiLink[]>();
    const mobile = useMediaPredicate("(orientation: portrait)");

    // Executa apenas uma vez quando o site é carregado
    useEffect(() => {
        const cacheFooter = readCache('footer' + '-' + userSettings.lang);

        if (cacheFooter) {
            setFooterData(cacheFooter);
            setLinksContato(cacheFooter['attributes']['Links_contatos']['data'] as ApiLink[]);
            setLinksRedesSociais(cacheFooter['attributes']['Links_redes']['data'] as ApiLink[]);
        }

        else {
            addLoadingCoins();

            axios
                .get(STRAPI_URL + '/api/footer?populate[Links_contatos][populate][0]=Icone_FA&populate[Links_redes][populate][0]=Icone_FA&locale=' + userSettings.lang,
                    { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const data = response['data']['data'];

                    setFooterData(data as ApiFooter);
                    setLinksContato(data['attributes']['Links_contatos']['data'] as ApiLink[]);
                    setLinksRedesSociais(data['attributes']['Links_redes']['data'] as ApiLink[]);

                    setCache('footer' + '-' + userSettings.lang, data);

                    subLoadingCoins();
                })
        }
    }, [userSettings.lang]);

    return (
        <footer>
            {footerData &&
                <nav className='footer'>
                    {!mobile
                        // DESKTOP
                        ? <div className='footer-row'>
                            {/* ENDEREÇO */}
                            <div className='footer-column' style={{ width: '25%' }}>
                                <h3> {String(footerData.attributes.Endereco_titulo)} </h3>
                                <p className='text'> {String(footerData.attributes.Endereco_texto)} </p>
                            </div>

                            {/* REDES SOCIAIS */}
                            <div className='footer-column' role='navigation' style={{ width: '30%', padding: 0, textAlign: 'center' }}>
                                <h3> {String(footerData.attributes.Redes_sociais)} </h3>
                                {linksRedesSociais && linksRedesSociais.map((link) => {
                                    const icon = String(link.attributes.Icone_FA).split(',') as [IconPrefix, IconName];

                                    return <div className='text' key={String(link.attributes.Texto)}>
                                        <a href={String(link.attributes.Link)}>
                                            <FontAwesomeIcon icon={icon} />
                                            {' ' + String(link.attributes.Texto)}
                                        </a>
                                    </div>
                                })}
                            </div>

                            {/* CONTATO */}
                            <div className='footer-column' role='navigation' style={{ width: '25%' }}>
                                <h3> {String(footerData.attributes.Contato_titulo)} </h3>
                                {linksContato && linksContato.map((link) => {
                                    const icon = String(link.attributes.Icone_FA).split(',') as [IconPrefix, IconName];

                                    return <div className='text' key={String(link.attributes.Texto)}>
                                        <a href={String(link.attributes.Link)}>
                                            <FontAwesomeIcon icon={icon} />
                                            {' ' + String(link.attributes.Texto)}
                                        </a>
                                    </div>
                                })}
                            </div>
                        </div>

                        // MOBILE
                        : <>
                            <div className='footer-row'>
                                {/* ENDEREÇO */}
                                <div className='footer-column' style={{ width: '70%' }}>
                                    <h3> {String(footerData.attributes.Endereco_titulo)} </h3>
                                    <p className='text'> {String(footerData.attributes.Endereco_texto)} </p>
                                </div>
                            </div>

                            <div className='footer-row'>
                                {/* REDES SOCIAIS */}
                                <div className='footer-column' role='navigation' style={{ width: '35%' }}>
                                    <h3> {String(footerData.attributes.Redes_sociais)} </h3>
                                    {linksRedesSociais && linksRedesSociais.map((link) => {
                                        const icon = String(link.attributes.Icone_FA).split(',') as [IconPrefix, IconName];

                                        return <div className='text' key={String(link.attributes.Texto)}>
                                            <a href={String(link.attributes.Link)}>
                                                <FontAwesomeIcon icon={icon} />
                                                {' ' + String(link.attributes.Texto)}
                                            </a>
                                        </div>
                                    })}
                                </div>

                                {/* CONTATO */}
                                <div className='footer-column' role='navigation' style={{ width: '35%' }}>
                                    <h3> {String(footerData.attributes.Contato_titulo)} </h3>
                                    {linksContato && linksContato.map((link) => {
                                        const icon = String(link.attributes.Icone_FA).split(',') as [IconPrefix, IconName];

                                        return <div className='text' key={String(link.attributes.Texto)}>
                                            <a href={String(link.attributes.Link)}>
                                                <FontAwesomeIcon icon={icon} />
                                                {' ' + String(link.attributes.Texto)}
                                            </a>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </>
                    }

                    <div className='footer-row'>
                        <div className='footer-column' style={{width: '35%', textAlign: 'center'}}>
                            <Link to={'/creditos'}>{String(footerData.attributes.Creditos)}</Link >
                        </div>
                        <div className='footer-column' style={{width: '35%', textAlign: 'center'}}>
                            <Link to={'/privacidade'}>{String(footerData.attributes.Politica_privacidade)}</Link >
                        </div>
                    </div>
                </nav>
            }
        </footer>
    );
}

export default AppFooter;