import { useEffect, useState } from "react";
import { NOTFOUND_ICON, STRAPI_API_TOKEN, STRAPI_URL, WIP_ICON } from "../utils/constants";
import { useLocation } from "react-router-dom";
import { useSettings } from "../utils/utils";
import axios from "axios";
import TopicBanner from "./PageBanner";
import TopicSection from "./PageSection";
import './PageLoader.scss'
import { ApiPagina, ApiSecao } from "../utils/types";
import { readCache, setCache } from "../Caching";

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

const getLinks = (sections: ApiSecao[]) => {
    let sectionLinks: sectionLink[] = [];

    sections.map((section) => {
        sectionLinks.push({
            name: String(section.attributes.Titulo),
            id: String(section.attributes.Titulo).replace(/[^a-z0-9áéíóúñüçãõà \.,_-]/gim, "").replace(/\s/g, "").trim(),
        } as sectionLink)
    })

    return sectionLinks;
}

const PageLoader = () => {
    const { userSettings } = useSettings();
    const [textData, setTextData] = useState<ApiPagina>();
    const [sections, setSections] = useState<ApiSecao[]>();
    const [bannerImage, setBannerImage] = useState<string>();
    const [gradient, setGradient] = useState<string>();
    const [status, setStatus] = useState<number>();
    const location = useLocation();

    // Recebe o texto e as imagens do Strapi
    useEffect(() => {
        const pageCache = readCache('secao/' + location.pathname + '-' + userSettings.lang);

        if (pageCache) {
            setTextData(pageCache as ApiPagina);
            setBannerImage(pageCache['attributes']['Banner_imagem']['data']['attributes']['url']);
            setGradient(pageCache['attributes']['Gradiente']['data']['attributes']['CSS'])

            if (pageCache['attributes']['secoes']['data'].length === 0) {
                setStatus(403);
                setSections(undefined);
                return;
            }

            setSections(pageCache['attributes']['secoes']['data']);

            setStatus(200);
        }

        else
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
    }, [userSettings.lang, location]);

    // Executa quando troca de rota
    useEffect(() => {
        // Sobe para o topo caso troque de página
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className='page-body'>
            {textData && bannerImage &&
                <TopicBanner
                    pageName={String(textData?.attributes.Banner_text)}
                    pageSections={getLinks(sections || [])}
                    bannerImage={STRAPI_URL + bannerImage}
                    bannerGradient={String(gradient || '')}
                />
            }

            {status === 200 && sections &&
                sections.map((section) => (
                    <TopicSection
                        key={String(section.attributes.Titulo)}
                        id={String(section.attributes.Titulo).replace(/[^a-z0-9áéíóúñüçãõà \.,_-]/gim, "").replace(/\s/g, "").trim()}
                        title={String(section.attributes.Titulo)}
                        body={String(section.attributes.Corpo)}
                        textColor={String(section.attributes.Cor_texto)}
                        backgroundColor={String(section.attributes.Cor_fundo)}
                    />
                ))
            }

            {status === 404 && NotFound}

            {status === 403 && WIP}
        </div>
    );
}

export default PageLoader;