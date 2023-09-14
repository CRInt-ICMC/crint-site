import './homepage.scss'
import TopicSection from '../componentes/TopicSection';
import { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../Context';
import { ApiSecaoSecao } from '../utils/generated/contentTypes';
import axios from 'axios';
import { DEFAULT_LANGUAGE, STRAPI_URL } from '../utils/appConstants';

const Homepage = () => {
    const {userConfig} = useContext(ConfigContext);
    const [imagemBackground, setImagemBackground] = useState<string>();
    const [secoes, setSecoes] = useState<ApiSecaoSecao[]>();

    useEffect(() => {
        axios.get(`http://localhost:1337/api/homepage?populate=*&locale=` + userConfig?.lang || DEFAULT_LANGUAGE)
        .then((response) => {
            setImagemBackground(response['data']['data']['attributes']['Imagem_fundo']['data']['attributes']['url']);
            setSecoes(response['data']['data']['attributes']['secoes']['data'])
        })
    }, [userConfig?.lang]);

    console.log(imagemBackground)

    return (
        <div className='homepage-body'>
            <section className='main-section' style={{backgroundImage: `url(${STRAPI_URL + imagemBackground})`}}>
                <span className='searchbar-container' style={{width: '70%'}}>
                </span>
            </section>
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