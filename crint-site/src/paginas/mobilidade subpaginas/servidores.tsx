import TopicBanner from '../../componentes/TopicBanner';
import TopicSection from '../../componentes/TopicSection';
import { BEJE_CLARO, MOBILIDADE_GRADIENTE } from '../../utils/appConstants';
import { MOBILIDADE_BANNER } from '../../utils/appImages';

const MobilidadeServidor = () => (
    <>
        <p>
            A CRInt tem apoiado os(as) funcionários(as) técnico-administrativos(as) para a participação em eventos internacionais ou outros eventos 
            pertinentes à internacionalização. A solicitação é em fluxo contínuo e deve ser feita diretamente pelo  
            email <a href="mailto:crint@icmc.usp.br">crint@icmc.usp.br</a>. Recomenda-se que a solicitação seja feita com pelo menos 60 dias 
            de antecedência do evento. 
        </p>
        <p>Documentos para a solicitação:</p>
        <ul>
            <li>Carta de aceite ou convite para o evento;</li>
            <li>Plano de trabalho com as motivações, atividades a serem desenvolvidas, resultados esperados;</li>
            <li>Orçamento dos valores sendo solicitados; e</li>
            <li>Artigo a ser apresentado (se for o caso).</li>
        </ul>
    </>
)

const OportunidadesServidores = () => {
    return (
        <>            
            <p>
                Ao longo do ano, diversas oportunidades de cursos de línguas, mobilidade internacional para servidores(as) técnicos(as) e 
                administrativos(as) e outras oportunidades no exterior são disponibilizadas. 
            </p>
            <p>
                Os(As) funcionários(as) podem acompanhar as oportunidades no exterior e editais em andamento pelas redes sociais da CRInt (<a href='https://www.instagram.com/icmc.usp/'>
                Instagram</a> e <a href='https://t.me/crinticmc'>Telegram</a>) ou por meio do <a href='https://uspdigital.usp.br/mundus'>Sistema 
                Mundus da USP</a>. No Mundus, selecione no menu a opção Editais {'>'} Servidores Técnicos e Administrativos. Ao selecionar o ICMC 
                na unidade de origem do(a) interessado(a), todos os editais válidos para servidores(as) técnicos(as) e administrativos(as) do ICMC/USP serão listados.
            </p>
        </>
    ); 
}

const Servidor = () => {
    return (
        <div id='servidor-root'>
            <TopicBanner topicoNome='SERVIDOR' topicoImage={MOBILIDADE_BANNER} style={{background: MOBILIDADE_GRADIENTE}} />
            <TopicSection
                title='Mobilidade'
                body={MobilidadeServidor()}
                />
            <TopicSection
                title='Oportunidades no Exterior e Editais em Andamento'
                body={OportunidadesServidores()}
                style={{backgroundColor: BEJE_CLARO}}
                />
        </div>
    );
}

export default Servidor;