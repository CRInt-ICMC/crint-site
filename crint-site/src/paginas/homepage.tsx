import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../Contexto';
import { ApiSecaoSecao } from '../utils/generated/contentTypes';
import { DEFAULT_LANGUAGE, STRAPI_API_TOKEN, STRAPI_URL } from '../utils/appConstants';
import TopicSection from '../componentes/TopicSection';
import axios from 'axios';
import './homepage.scss';

const Homepage = () => {
    const {userSettings} = useContext(SettingsContext);
    const [backgroundImages, setBackgroundImages] = useState<string>();
    const [sections, setSections] = useState<ApiSecaoSecao[]>();

    // Recebe a imagem de fundo e as seções
    useEffect(() => {
        axios.get(STRAPI_URL + `/api/homepage?populate=*&locale=` + userSettings?.lang || DEFAULT_LANGUAGE, {'headers': {'Authorization': STRAPI_API_TOKEN}})
        .then((response) => {
            setBackgroundImages(response['data']['data']['attributes']['Imagem_fundo']['data']['attributes']['url']);
            setSections(response['data']['data']['attributes']['secoes']['data'])
        })
    }, [userSettings?.lang]);

    return (
        <div className='homepage-body'>
            {/* Carrega a imagem central */}
            <section className='main-section' style={{backgroundImage: `url(${STRAPI_URL + backgroundImages})`}}></section>

            {/* Carrega as seções */}
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
        </div>
    )
}

export default Homepage;