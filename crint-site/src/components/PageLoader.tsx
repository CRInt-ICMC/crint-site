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

import { useEffect, useState } from "react";
import { NOTFOUND_ICON, STRAPI_API_TOKEN, STRAPI_URL, WIP_ICON } from "../utils/constants";
import { Link, useLocation } from "react-router-dom";
import { cleanText, getLinks, useLoading, useSettings } from "../utils/utils";
import { ApiPage, ApiSection } from "../utils/types";
import { readCache, setCache } from "../Caching";
import { useMediaPredicate } from "react-media-hook";
import axios from "axios";
import PageBanner from "./PageBanner";
import PageSection from "./PageSection";
import './PageLoader.scss'

interface PageData {
    bannerText: string;
    bannerImage: string;
    gradient: string;
    sections: {
        title: string,
        summary: string,
        body: string,
        color: string,
        backgroundColor: string,
    }[];
}

const WIP = (
    <div className="wip-root">
        <div className="wip-content">
            <img src={WIP_ICON} />
        </div>
    </div>
);

const NotFound = (
    <div className='notfound-root'>
        <div className='notfound-content'>
            <h1>Página não encontrada</h1>
            <img src={NOTFOUND_ICON} alt="Erro 404: Not Found" />
            <Link to='/'>Voltar para a página inicial</Link>
        </div>
    </div>
);

const PageLoader = () => {
    const { userSettings } = useSettings();
    const { addLoadingCoins, subLoadingCoins } = useLoading();

    const [pageData, setPageData] = useState<PageData>();

    const [status, setStatus] = useState<number>();

    const mobile = useMediaPredicate("(orientation: portrait)");
    const location = useLocation();

    // Recebe o texto e as imagens do Strapi
    useEffect(() => {
        const pageCache: PageData = readCache('page/' + location.pathname + '-' + userSettings.lang);

        if (pageCache) {
            pageCache.sections.length === 0 ? setStatus(403) : setStatus(200);
            setPageData(pageCache);
        }

        else {
            addLoadingCoins();

            axios
                // Strapi + Chamada de página filtrada por UID + Idioma selecionado
                .get(STRAPI_URL + `/api/paginas?filters[URL][$eq]=${location.pathname}&populate=*&locale=` + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const raw = response['data']['data'][0] as ApiPage;

                    // Verifica se a página existe
                    if (raw === undefined) {
                        setStatus(404);
                        subLoadingCoins();
                        return;
                    }

                    let data: PageData = {
                        bannerText: raw['attributes']['Banner_text'],
                        bannerImage: String(raw['attributes']['Banner_imagem']['data']['attributes']['url']),
                        gradient: String(raw['attributes']['Gradiente']['data']['attributes']['CSS']),
                        sections: []
                    };

                    if (raw['attributes']['secoes']['data'].length === 0)
                        setStatus(403);

                    else {
                        raw['attributes']['secoes']['data'].map((section: ApiSection) => {
                            data.sections.push({
                                title: String(section['attributes']['Titulo']),
                                summary: String(section['attributes']['Sumario']),
                                body: String(section['attributes']['Corpo']),
                                color: String(section['attributes']['Cor_texto']),
                                backgroundColor: String(section['attributes']['Cor_fundo']),
                            })
                        })

                        setStatus(200);
                    }

                    setPageData(data);
                    setCache('page/' + location.pathname + '-' + userSettings.lang, data);
                    subLoadingCoins();
                });
        }
    }, [userSettings.lang, location]);

    // Sobe para o topo da página ao trocar de página
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className='page-body'>
            {/* BANNER */}
            {pageData && status === 200 &&
                <>
                    <PageBanner
                        pageName={pageData.bannerText}
                        pageSections={getLinks(pageData.sections || [])}
                        bannerImage={STRAPI_URL + pageData.bannerImage}
                        bannerGradient={pageData.gradient}
                    />

                    {pageData.sections.map((section) => (
                        <PageSection
                            key={section.title}
                            id={pageData.sections.indexOf(section) + '-' + cleanText(section.title)}
                            title={section.title}
                            body={section.body}
                            textColor={section.color}
                            backgroundColor={section.backgroundColor}
                            mobile={mobile}
                            api
                        />
                    ))}
                </>
            }

            {status === 404 && NotFound}

            {status === 403 && WIP}
        </div>
    );
}

export default PageLoader;