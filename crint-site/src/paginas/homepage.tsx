import './homepage.scss'
import TopicSection from '../componentes/TopicSection';
import { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../Context';
import { ApiPaginaPagina, ApiSecaoSecao } from '../utils/generated/contentTypes';
import axios from 'axios';
import { DEFAULT_LANGUAGE } from '../utils/appConstants';

const Homepage = () => {
    const {userConfig} = useContext(ConfigContext);
    const [langDict, setLangDict] = useState<ApiPaginaPagina>();
    const [secoes, setSecoes] = useState<ApiSecaoSecao[]>();

    useEffect(() => {
        axios.get(`http://localhost:1337/api/homepage?populate=secoes&locale=` + userConfig?.lang || DEFAULT_LANGUAGE)
        .then((response) => {
            setLangDict(response['data']['data'] as ApiPaginaPagina);
            console.log(response['data']['data'])
            setSecoes(response['data']['data']['attributes']['secoes']['data'])
        })
    }, [userConfig?.lang]);

    return (
        <div className='homepage-body'>
            <section className='main-section'>
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