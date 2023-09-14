import { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../Context';
import { ApiSecaoSecao } from '../utils/generated/contentTypes';
import { DEFAULT_LANGUAGE, STRAPI_URL } from '../utils/appConstants';
import TopicSection from '../componentes/TopicSection';
import axios from 'axios';
import './homepage.scss'

const Homepage = () => {
    const {userConfig} = useContext(ConfigContext);
    const [imagemBackground, setImagemBackground] = useState<string>();
    const [secoes, setSecoes] = useState<ApiSecaoSecao[]>();

    // Recebe a imagem de fundo e as seções
    useEffect(() => {
        axios.get(`http://localhost:1337/api/homepage?populate=*&locale=` + userConfig?.lang || DEFAULT_LANGUAGE)
        .then((response) => {
            setImagemBackground(response['data']['data']['attributes']['Imagem_fundo']['data']['attributes']['url']);
            setSecoes(response['data']['data']['attributes']['secoes']['data'])
        })
    }, [userConfig?.lang]);

    return (
        <div className='homepage-body'>
            {/* Carrega a imagem central */}
            <section className='main-section' style={{backgroundImage: `url(${STRAPI_URL + imagemBackground})`}}></section>

            {/* Carrega as seções */}
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
    )
}

export default Homepage;