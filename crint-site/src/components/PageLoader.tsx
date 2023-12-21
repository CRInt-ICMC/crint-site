import { useEffect, useState } from "react";
import { NOTFOUND_ICON, STRAPI_API_TOKEN, STRAPI_URL, WIP_ICON } from "../utils/constants";
import { useLocation } from "react-router-dom";
import { cleanText, getLinks, useLoading, useSettings } from "../utils/utils";
import { ApiPagina, ApiSecao } from "../utils/types";
import { readCache, setCache } from "../Caching";
import axios from "axios";
import PageBanner from "./PageBanner";
import PageSection from "./PageSection";
import './PageLoader.scss'
import { useMediaPredicate } from "react-media-hook";

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
        </div>
    </div>
);

const PageLoader = () => {
    const { userSettings } = useSettings();
    const { addLoadingCoins, subLoadingCoins } = useLoading();

    const [textData, setTextData] = useState<ApiPagina>();
    const [sections, setSections] = useState<ApiSecao[]>();
    const [bannerImage, setBannerImage] = useState<string>();
    const [gradient, setGradient] = useState<string>();

    const [status, setStatus] = useState<number>();
    const mobile = useMediaPredicate("(orientation: portrait)");
    const location = useLocation();

    // Recebe o texto e as imagens do Strapi
    useEffect(() => {
        const pageCache = readCache('secao/' + location.pathname + '-' + userSettings.lang);

        if (pageCache) {
            setTextData(pageCache as ApiPagina);
            setBannerImage(pageCache['attributes']['Banner_imagem']['data']['attributes']['url']);
            setGradient(pageCache['attributes']['Gradiente']['data']['attributes']['CSS']);

            if (pageCache['attributes']['secoes']['data'].length === 0) {
                setStatus(403);
                setSections(undefined);
                return;
            }

            setSections(pageCache['attributes']['secoes']['data']);

            setStatus(200);
        }

        else {
            addLoadingCoins();

            axios
                // Strapi + Chamada de página filtrada por UID + Idioma selecionado
                .get(STRAPI_URL + `/api/paginas?filters[URL][$eq]=${location.pathname}&populate=*&locale=` + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const data = response['data']['data'][0];

                    // Verifica se a página existe
                    if (data === undefined) {
                        setStatus(404);
                        return;
                    }

                    // Passa o texto e a imagem do banner para seus hooks
                    setTextData(data as ApiPagina);
                    setBannerImage(data['attributes']['Banner_imagem']['data']['attributes']['url']);
                    setGradient(data['attributes']['Gradiente']['data']['attributes']['CSS']);

                    setCache('secao/' + location.pathname + '-' + userSettings.lang, data);
                    subLoadingCoins();

                    // Verifica se encontrou as seções, se não, a página está em construção
                    if (data['attributes']['secoes']['data'].length === 0) {
                        setStatus(403);
                        setSections(undefined);
                        return;
                    }

                    // Passa as seções para seu hook
                    setSections(data['attributes']['secoes']['data']);

                    setStatus(200);
                })
        }
    }, [userSettings.lang, location]);

    // Sobe para o topo da página ao trocar de página
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className='page-body'>
            {/* BANNER */}
            {textData && bannerImage &&
                <PageBanner
                    pageName={String(textData?.attributes.Banner_text)}
                    pageSections={getLinks(sections || [])}
                    bannerImage={STRAPI_URL + bannerImage}
                    bannerGradient={String(gradient || '')}
                />
            }

            {/* SEÇÕES */}
            {status === 200 && sections &&
                sections.map((section) => (
                    <PageSection
                        key={String(section.attributes.Titulo)}
                        id={cleanText(String(section.attributes.Titulo))}
                        title={String(section.attributes.Titulo)}
                        body={String(section.attributes.Corpo)}
                        textColor={String(section.attributes.Cor_texto)}
                        backgroundColor={String(section.attributes.Cor_fundo)}
                        mobile={mobile}
                        api
                    />
                ))
            }

            {status === 404 && NotFound}

            {status === 403 && WIP}
        </div>
    );
}

export default PageLoader;