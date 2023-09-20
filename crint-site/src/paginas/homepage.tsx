import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../Contexto';
import { ApiSecaoSecao } from '../utils/generated/contentTypes';
import { DEFAULT_LANGUAGE, STRAPI_API_TOKEN, STRAPI_URL } from '../utils/appConstants';
import TopicSection from '../componentes/TopicSection';
import axios from 'axios';
import './homepage.scss'

const Homepage = () => {
    const {userSettings} = useContext(SettingsContext);
    const [imagemBackground, setImagemBackground] = useState<string>();
    const [secoes, setSecoes] = useState<ApiSecaoSecao[]>();

    // Recebe a imagem de fundo e as seções
    useEffect(() => {
        axios.get(STRAPI_URL + `/api/homepage?populate=*&locale=` + userSettings?.lang || DEFAULT_LANGUAGE, {'headers': {'Authorization': STRAPI_API_TOKEN}})
        .then((response) => {
            setImagemBackground(response['data']['data']['attributes']['Imagem_fundo']['data']['attributes']['url']);
            setSecoes(response['data']['data']['attributes']['secoes']['data'])
        })
    }, [userSettings?.lang]);

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