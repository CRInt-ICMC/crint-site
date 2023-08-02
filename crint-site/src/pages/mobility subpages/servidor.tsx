import TopicBanner from '../../components/TopicBanner';
import TopicSection from '../../components/TopicSection';
import './servidor.css'

const MobilidadeServidor = () => (
    <>
        <p>
            A CRInt tem apoiado os funcionários técnico-administrativos para a participação em eventos internacionais ou outros eventos 
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
            <h3>Oportunidades no Exterior e Editais em Andamento</h3>
            <p>
                Ao longo do ano, diversas oportunidades de cursos de línguas, mobilidade internacional para servidores técnicos e administrativos e 
                outras oportunidades no exterior são disponibilizadas. 
            </p>
            <p>
                Os funcionários podem acompanhar as oportunidades no exterior e editais em andamento pelas redes sociais da CRInt (<a href='https://www.instagram.com/icmc.usp/'>
                Instagram</a> e <a href='https://t.me/crinticmc'>Telegram</a>) ou por meio do <a href='https://uspdigital.usp.br/mundus'>Sistema 
                Mundus da USP</a>. No Mundus, selecione no menu a opção Editais {'>'} Servidores Técnicos e Administrativos. Ao selecionar o ICMC 
                na unidade de origem do interessado, todos os editais válidos para servidores técnicos e administrativos do ICMC/USP serão listados.
            </p>
        </>
    ); 
}

const Servidor = () => {
    return (
        <div id='servidor-root'>
            <TopicBanner topicoNome='SERVIDOR' />
            <TopicSection
                title='Mobilidade'
                body={MobilidadeServidor()}
                />
            <TopicSection
                title='Mobilidade'
                body={OportunidadesServidores()}
                />
        </div>
    );
}

export default Servidor;