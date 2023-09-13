import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../Context";
import { ApiPaginaPagina, ApiSecaoSecao } from "../utils/generated/contentTypes";
import axios from "axios";
import TopicBanner from "./TopicBanner";
import TopicSection from "./TopicSection";
import { DEFAULT_LANGUAGE } from "../utils/appConstants";

const PageLoader = (props : {uid : string, topicoImagem : string, topicoGradiente : string}) => {
    const {userConfig} = useContext(ConfigContext);
    const [langDict, setLangDict] = useState<ApiPaginaPagina>();
    const [secoes, setSecoes] = useState<ApiSecaoSecao[]>();

    useEffect(() => {
        axios.get(`http://localhost:1337/api/paginas?filters[UID][$eq]=${props.uid}&populate=secoes&locale=` + userConfig?.lang || DEFAULT_LANGUAGE)
        .then((response) => {
            if (response.status !== 200)
                return;

            setLangDict(response['data']['data'][0] as ApiPaginaPagina);

            if (response['data']['data'][0]['attributes']['secoes'] === undefined)
                console.log("Eita")

            setSecoes(response['data']['data'][0]['attributes']['secoes']['data'])
        })
    }, [userConfig?.lang]);

    return (
        <>
            <TopicBanner topicoNome={String(langDict?.attributes.Banner_text || '')} 
                topicoImage={props.topicoImagem} 
                style={{background: props.topicoGradiente}} 
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
        </>
    );
}

export default PageLoader;