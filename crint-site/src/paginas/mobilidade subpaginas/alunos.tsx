import { useContext, useEffect, useState } from 'react';
import TopicBanner from '../../componentes/TopicBanner';
import TopicSection from '../../componentes/TopicSection';
import { MOBILIDADE_GRADIENTE } from '../../utils/appConstants';
import { MOBILIDADE_BANNER } from '../../utils/appImages';
import { ConfigContext } from '../../Context';
import axios from 'axios';
import { ApiPaginaPagina, ApiSecaoSecao } from '../../utils/generated/contentTypes';

const PageSections = (secoes : ApiSecaoSecao[]) => {
    
    return (
        <>
            {secoes.map((secao) => {
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
            })}
        </>
    );
}

const Aluno = () => {
    const {userConfig} = useContext(ConfigContext);
    const [langDict, setLangDict] = useState<ApiPaginaPagina>();
    const [secoes, setSecoes] = useState<ApiSecaoSecao[]>();

    useEffect(() => {
        axios.get('http://localhost:1337/api/paginas?filters[uid][$eq]=alunos&populate=secoes').then((response) => {
            setLangDict(response['data']['data'][0] as ApiPaginaPagina);
            setSecoes(response['data']['data'][0]['attributes']['secoes']['data'])
        })
    }, [userConfig?.lang]);

    return (
        <div id='aluno-root'>
            <TopicBanner topicoNome={String(langDict?.attributes.Banner_text || '')} 
                topicoImage={MOBILIDADE_BANNER} 
                style={{background: MOBILIDADE_GRADIENTE}} 
                />

            {secoes && PageSections(secoes)}
        </div>
    );
}

export default Aluno;