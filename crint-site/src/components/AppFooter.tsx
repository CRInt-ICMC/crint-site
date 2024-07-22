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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { STRAPI_API_TOKEN, STRAPI_URL } from '../utils/constants';
import { useLoading, useSettings } from '../utils/utils';
import { ApiLink } from '../utils/types';
import { readCache, setCache } from '../Caching';
import { Grid } from '@mui/material';
import axios from 'axios';
import './AppFooter.scss'

interface FooterLink {
    text: string,
    url: string,
    icon: [IconPrefix, IconName],
}

interface FooterData {
    address: { title: string, text: string },
    socials: { title: string, links: FooterLink[] },
    contacts: { title: string, links: FooterLink[] },
    credits: string,
    privacy: string,
}

const AppFooter = () => {
    const { userSettings } = useSettings();
    const { addLoadingCoins, subLoadingCoins } = useLoading();
    const [footerData, setFooterData] = useState<FooterData>();

    // Executa apenas uma vez quando o site é carregado
    useEffect(() => {
        const cacheFooter = readCache('footer' + '-' + userSettings.lang);

        if (cacheFooter)
            setFooterData(cacheFooter);

        else {
            addLoadingCoins();

            axios
                .get(STRAPI_URL + '/api/footer?populate[Links_contatos][populate][0]=Icone_FA&populate[Links_redes][populate][0]=Icone_FA&locale=' + userSettings.lang,
                    { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const raw = response['data']['data'];

                    let data: FooterData = {
                        address: {
                            title: raw['attributes']['Endereco_titulo'],
                            text: raw['attributes']['Endereco_texto']
                        },
                        socials: {
                            title: raw['attributes']['Redes_sociais'],
                            links: []
                        },
                        contacts: {
                            title: raw['attributes']['Contato_titulo'],
                            links: []
                        },
                        credits: raw['attributes']['Creditos'],
                        privacy: raw['attributes']['Politica_privacidade']
                    }

                    raw['attributes']['Links_contatos']['data'].map((link: ApiLink) => {
                        data['contacts']['links'].push({
                            text: String(link['attributes']['Texto']),
                            url: String(link['attributes']['Link']),
                            icon: String(link['attributes']['Icone_FA']).split(',') as [IconPrefix, IconName]
                        })
                    })

                    raw['attributes']['Links_redes']['data'].map((link: ApiLink) => {
                        data['socials']['links'].push({
                            text: String(link['attributes']['Texto']),
                            url: String(link['attributes']['Link']),
                            icon: String(link['attributes']['Icone_FA']).split(',') as [IconPrefix, IconName]
                        })
                    })

                    setFooterData(data);
                    setCache('footer' + '-' + userSettings.lang, data);

                    subLoadingCoins();
                })
        }
    }, [userSettings.lang]);

    return (
        <footer>
            {footerData &&
                <nav className='footer'>
                    <Grid sx={{ rowGap: 8 }} container spacing={0} justifyContent="space-evenly" alignItems="flex-start" className='footer-row'>
                        {/* ENDEREÇO */}
                        <Grid item xs={8} md={3} className='footer-column' style={{ width: '25%' }}>
                            <h3> {footerData.address.title} </h3>
                            <p className='text'> {footerData.address.text} </p>
                        </Grid>

                        {/* REDES SOCIAIS */}
                        <Grid item xs={5.5} md={2.5} className='footer-column' role='navigation' style={{ width: '30%', padding: 0, textAlign: 'center' }}>
                            <h3> {footerData.socials.title} </h3>
                            {footerData.socials && footerData.socials.links.map((link) => {
                                return <div className='text' key={link.text}>
                                    <a href={link.url}>
                                        <FontAwesomeIcon icon={link.icon} />
                                        {' ' + link.text}
                                    </a>
                                </div>
                            })}
                        </Grid>

                        {/* CONTATO */}
                        <Grid item xs={5.5} md={3} className='footer-column' role='navigation' style={{ width: '25%' }}>
                            <h3> {footerData.contacts.title} </h3>
                            {footerData.contacts && footerData.contacts.links.map((link) => {
                                return <div className='text' key={link.text}>
                                    <a href={link.url}>
                                        <FontAwesomeIcon icon={link.icon} />
                                        {' ' + link.text}
                                    </a>
                                </div>
                            })}
                        </Grid>
                    </Grid>

                    <Grid sx={{ rowGap: 2, columnGap: 16 }} container justifyContent="center" className='footer-row'>
                        <Grid item className='footer-column' xs={10} md={4} style={{ textAlign: 'center' }}>
                            <Link to={'/creditos'}>{footerData.credits}</Link >
                        </Grid>
                        <Grid item className='footer-column' xs={10} md={4} style={{ textAlign: 'center' }}>
                            <Link to={'/privacidade'}>{footerData.privacy}</Link >
                        </Grid>
                    </Grid>
                </nav>
            }
        </footer>
    );
}

export default AppFooter;