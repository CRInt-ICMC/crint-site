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

const Servidor = () => {
    return (
        <div id='servidor-root'>
            <TopicBanner topicoNome='SERVIDOR' />
            <TopicSection
                title='Mobilidade'
                body={MobilidadeServidor()}
                />
        </div>
    );
}

export default Servidor;