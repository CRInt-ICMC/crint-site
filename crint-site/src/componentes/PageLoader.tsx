import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../Context";
import { ApiPaginaPagina, ApiSecaoSecao } from "../utils/generated/contentTypes";
import { DEFAULT_LANGUAGE, STRAPI_URL } from "../utils/appConstants";
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
    const {userConfig} = useContext(ConfigContext);
    const [texto, setTexto] = useState<ApiPaginaPagina>();
    const [secoes, setSecoes] = useState<ApiSecaoSecao[]>();
    const [imagemBanner, setImagemBanner] = useState<any>();
    const [status, setStatus] = useState<number>();
    const location = useLocation();

    // Recebe o texto e as imagens do Strapi
    useEffect(() => {
        // Strapi + Chamada de página filtrada por UID + Idioma selecionado
        axios.get(STRAPI_URL + `/api/paginas?filters[URL][$eq]=${location.pathname}&populate=*&locale=` + userConfig?.lang || DEFAULT_LANGUAGE)
        .then((response) => {
            // Verifica se a página existe
            if (response['data']['data'][0] === undefined) {
                setStatus(404);
                return;
            }

            // Passa o texto e a imagem do banner para seus hooks
            setTexto(response['data']['data'][0] as ApiPaginaPagina);
            setImagemBanner(response['data']['data'][0]['attributes']['Banner_imagem']['data']['attributes']['url']);

            // Verifica se encontrou as seções, se não, a página está em construção
            if (response['data']['data'][0]['attributes']['secoes']['data'].length === 0) {
                setStatus(403);
                console.log("OI")
                return;
            }

            // Passa as seções para seu hook
            setSecoes(response['data']['data'][0]['attributes']['secoes']['data']);

            setStatus(200);
        })
    }, [userConfig?.lang, location]);

    // Executa quando troca de rota
    useEffect(()=>{
        // Sobe para o topo caso troque de página
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className='page-body'>
            {imagemBanner &&
                <TopicBanner topicoNome={String(texto?.attributes.Banner_text || '')} 
                    topicoImage={STRAPI_URL + imagemBanner} 
                    style={{background: String(texto?.attributes.Gradiente)}}
                    />
            }

            {secoes && 
                secoes.map((secao) => {
                    return (
                        <TopicSection 
                            key={String(secao.attributes.Titulo || '')} 
                            title={String(secao.attributes.Titulo || '')}
                            body={String(secao.attributes.Corpo || '')}
                            style={{
                                color: String(secao.attributes.Cor_texto || ''),
                                backgroundColor: String(secao.attributes.Cor_fundo || '')
                            }}
                            />
                    );
                })
            }

            {status === 404 &&
                NotFound
            }

            {status === 403 &&
                WIP
            }
        </div>
    );
}

export default PageLoader;