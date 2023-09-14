import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../Context";
import { ApiPaginaPagina, ApiSecaoSecao } from "../utils/generated/contentTypes";
import axios from "axios";
import TopicBanner from "./TopicBanner";
import TopicSection from "./TopicSection";
import { DEFAULT_LANGUAGE, STRAPI_URL } from "../utils/appConstants";
import './PageLoader.scss'

const PageLoader = (props : {uid : string}) => {
    const {userConfig} = useContext(ConfigContext);
    const [texto, setTexto] = useState<ApiPaginaPagina>();
    const [secoes, setSecoes] = useState<ApiSecaoSecao[]>();
    const [imagemBanner, setImagemBanner] = useState<any>();

    // Recebe o texto e as imagens do Strapi
    useEffect(() => {
        // Strapi + Chamada de página filtrada por UID + Idioma selecionado
        axios.get(STRAPI_URL + `/api/paginas?filters[UID][$eq]=${props.uid}&populate=*&locale=` + userConfig?.lang || DEFAULT_LANGUAGE)
        .then((response) => {
            if (response.status !== 200)
                return;

            setTexto(response['data']['data'][0] as ApiPaginaPagina);
            setImagemBanner(response['data']['data'][0]['attributes']['Banner_imagem']['data']['attributes']['url'])

            if (response['data']['data'][0]['attributes']['secoes'] === undefined)
                console.log("Eita")

            setSecoes(response['data']['data'][0]['attributes']['secoes']['data'])
        })
    }, [userConfig?.lang]);

    return (
        <div className='page-body'>
            <TopicBanner topicoNome={String(texto?.attributes.Banner_text || '')} 
                topicoImage={STRAPI_URL + imagemBanner} 
                style={{background: String(texto?.attributes.Gradiente)}}
                />

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
        </div>
    );
}

export default PageLoader;