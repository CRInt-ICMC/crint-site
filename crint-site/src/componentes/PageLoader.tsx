import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../Contexto";
import { ApiPaginaPagina, ApiSecaoSecao } from "../utils/generated/contentTypes";
import { DEFAULT_LANGUAGE, STRAPI_API_TOKEN, STRAPI_URL } from "../utils/appConstants";
import { useLocation } from "react-router-dom";
import { NOTFOUND_ICON, WIP_ICON } from "../utils/appImages";
import axios from "axios";
import TopicBanner from "./TopicBanner";
import TopicSection from "./TopicSection";
import './PageLoader.scss'

const WIP = (
    <div className="wip-root">
        <div className="wip-content">
            <img src={WIP_ICON} />
        </div>
    </div>
);

const NotFound = (
    <div id='notfound-root'>
        <div id='notfound-content'>
            <h1>Página não encontrada</h1>
            <img src={NOTFOUND_ICON} alt="Erro 404: Not Found" />
        </div>
    </div>
);

const PageLoader = () => {
    const {userSettings} = useContext(SettingsContext);
    const [textData, setTextData] = useState<ApiPaginaPagina>();
    const [sections, setSections] = useState<ApiSecaoSecao[]>();
    const [bannerImages, setBannerImages] = useState<any>();
    const [status, setStatus] = useState<number>();
    const location = useLocation();

    // Recebe o texto e as imagens do Strapi
    useEffect(() => {
        // Strapi + Chamada de página filtrada por UID + Idioma selecionado
        axios.get(STRAPI_URL + `/api/paginas?filters[URL][$eq]=${location.pathname}&populate=*&locale=` + userSettings?.lang || DEFAULT_LANGUAGE, {'headers': {'Authorization': STRAPI_API_TOKEN}})
        .then((response) => {
            // Verifica se a página existe
            if (response['data']['data'][0] === undefined) {
                setStatus(404);
                return;
            }

            // Passa o texto e a imagem do banner para seus hooks
            setTextData(response['data']['data'][0] as ApiPaginaPagina);
            setBannerImages(response['data']['data'][0]['attributes']['Banner_imagem']['data']['attributes']['url']);

            // Verifica se encontrou as seções, se não, a página está em construção
            if (response['data']['data'][0]['attributes']['secoes']['data'].length === 0) {
                setStatus(403);
                console.log("OI")
                return;
            }

            // Passa as seções para seu hook
            setSections(response['data']['data'][0]['attributes']['secoes']['data']);

            setStatus(200);
        })
    }, [userSettings?.lang, location]);

    // Executa quando troca de rota
    useEffect(()=>{
        // Sobe para o topo caso troque de página
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className='page-body'>
            { bannerImages &&
                <TopicBanner topicoNome={String(textData?.attributes.Banner_text || '')} 
                    topicImage={STRAPI_URL + bannerImages} 
                    style={{background: String(textData?.attributes.Gradiente)}}
                    />
            }

            { sections && 
                sections.map((section) => {
                    return (
                        <TopicSection 
                            key={String(section.attributes.Titulo || '')} 
                            title={String(section.attributes.Titulo || '')}
                            body={String(section.attributes.Corpo || '')}
                            style={{
                                color: String(section.attributes.Cor_texto || ''),
                                backgroundColor: String(section.attributes.Cor_fundo || '')
                            }}
                            />
                    );
                })
            }

            { status === 404 && NotFound }

            { status === 403 && WIP }
        </div>
    );
}

export default PageLoader;