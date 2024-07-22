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
import { Link, useLocation } from 'react-router-dom';
import { STRAPI_URL, STRAPI_API_TOKEN } from '../utils/constants';
import { useLoading, useSettings } from '../utils/utils';
import { useMediaPredicate } from 'react-media-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { ApiTopic, ApiPage } from '../utils/types';
import { readCache, setCache } from '../Caching';
import axios from 'axios';
import DropdownMenu from './DropdownMenu';
import LangSystem from './LangSystem';
import FontsizeSystem from './FontsizeSystem';
import Grid from '@mui/material/Grid';
import AnimateHeight from 'react-animate-height';
import './AppHeader.scss';

interface HeaderTopics {
    name: string,
    pages: {
        title: string,
        url: string,
    }[],
}

interface HeaderImages {
    icmc: string,
    icmcMini: string,
}


const topics = (topicos: HeaderTopics[]) => (
    <Grid item xs={5} md={8} className='navbar-column navbar-center' role='navigation'>
        {
            topicos.map((topico) => (<DropdownMenu
                key={topico.name}
                head={<p>{topico.name}</p>}
                body={<span className='subtopics'>
                    {
                        topico.pages.map((page: { title: string, url: string }) => (
                            <Link
                                key={page.title}
                                to={page.url}
                            >
                                {page.title}
                            </Link>
                        ))
                    }
                </span>
                }
            />
            ))
        }
    </Grid>
)


const topicsMobile = (topicos: HeaderTopics[], currentUrl: string, open: Boolean, toggleOpen: CallableFunction) => (
    <>
        <Grid item xs={5} md={8.5} className='navbar-column navbar-center' role='navigation'>
            <div className='navbar-mobile'>
                <button onClick={() => { toggleOpen(!open) }} style={{ backgroundColor: 'transparent' }} >
                    <div className='title'>
                        <p>Menu</p>
                        <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
                    </div>
                </button>
            </div>
        </Grid>

        <AnimateHeight className='navbar-mobile-itens-wrapper' height={open ? 'auto' : 0}>
            <Grid justifyContent="center" container>
                {
                    topicos.map((topico) => (
                        <Grid item xs={8} key={topico.name}>
                            <span className='subtopics'>
                                <span className='title'>{topico.name}</span>
                                {
                                    topico.pages.map((pagina: { title: string, url: string }) => (
                                        <Link className={(currentUrl === pagina.url) ? 'highlight' : ''}
                                            key={pagina.title}
                                            to={pagina.url}
                                        >
                                            <FontAwesomeIcon icon={faAngleRight} style={{ paddingRight: '5px' }} />
                                            {pagina.title}
                                        </Link>
                                    ))
                                }
                            </span>
                        </Grid>
                    ))
                }
            </Grid>
        </AnimateHeight>
    </>
)


const AppHeader = () => {
    // Hooks    
    const context = useSettings();
    const { userSettings } = context;
    const { addLoadingCoins, subLoadingCoins } = useLoading();

    const [headerImages, setHeaderImages] = useState<HeaderImages>();
    const [topicos, setTopicos] = useState<HeaderTopics[]>();
    const [open, toggleOpen] = useState(false);

    const mobile = useMediaPredicate("(orientation: portrait)");
    const location = useLocation();

    // Executa apenas quando a linguagem é alterada
    useEffect(() => {
        const cacheHeaderImages = readCache('headerImages');
        const cacheTopicos = readCache('topicos' + '-' + userSettings.lang);

        if (cacheHeaderImages)
            setHeaderImages(cacheHeaderImages);

        else {
            addLoadingCoins();

            axios
                .get(STRAPI_URL + '/api/header?populate=*&locale=' + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const data = response['data']['data'];

                    const dataImages = {
                        icmc: data['attributes']['ICMC']['data']['attributes']['url'],
                        icmcMini: data['attributes']['ICMC_mini']['data']['attributes']['url'],
                    };

                    setHeaderImages(dataImages);
                    setCache('headerImages', dataImages);
                    subLoadingCoins();
                })
        }

        if (cacheTopicos)
            setTopicos(cacheTopicos);

        else {
            addLoadingCoins();

            axios
                .get(STRAPI_URL + '/api/topicos?populate=*&locale=' + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const dataTopicos: HeaderTopics[] = [];
                    response['data']['data'].map((raw: ApiTopic) => {
                        let topico: HeaderTopics = {
                            name: String(raw['attributes']['Nome']),
                            pages: [],
                        };


                        raw['attributes']['paginas']['data'].map((page: ApiPage) => {
                            topico.pages.push({
                                title: String(page['attributes']['Titulo']),
                                url: String(page['attributes']['URL']),
                            })
                        });

                        dataTopicos.push(topico);
                    })

                    setTopicos(dataTopicos);
                    setCache('topicos' + '-' + userSettings.lang, dataTopicos);
                    subLoadingCoins();
                })
        }
    }, [userSettings.lang]);

    return (
        <header className='header-root'>
            <Grid container spacing={0.5} className='navbar'>
                {/* LOGO */}
                <Grid item xs={3} md={2} className='navbar-column logo'>
                    {headerImages &&
                        <Link to={'/'}>
                            <img className='logo-crint' alt='Link Página Principal' src={STRAPI_URL +
                                (mobile ? headerImages.icmcMini : headerImages.icmc)} />
                        </Link>
                    }
                </Grid>

                {/* TÓPICOS */}
                {topicos && !mobile && topics(topicos)}

                {topicos && mobile && topicsMobile(topicos, location.pathname, open, toggleOpen)}

                {/* OPÇÕES */}
                <Grid item xs={4} md={2} className='navbar-column options'>
                    <LangSystem />
                    <FontsizeSystem />
                </Grid>
            </Grid>
        </header>
    );
}

export default AppHeader;