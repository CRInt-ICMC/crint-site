import TopicBanner from '../../components/TopicBanner';
import TopicSection from '../../components/TopicSection';
import { MARMORE } from '../../utils/appConstants';
import './professor.css'

const AuxiliosFinanceiros = () => (
    <>
        <p>A CRInt tem apoiado os docentes para a participação em eventos internacionais ou outros eventos pertinentes à internalização. 
            A solicitação é em fluxo contínuo e deve ser feita diretamente à 
            <a href='https://www.icmc.usp.br/pesquisa/informacoes-gerais-e-servicos'>Comissão de Pesquisa (CPq)</a>. 
            Após análise de mérito por essa comissão, a solicitação é enviada internamente para a CRInt. Recomenda-se que a solicitação 
            seja feita com pelo menos 60 dias de antecedência do evento.
        </p>
    </>
)

const Professor = () => {
    return (
        <div id='professor-root'>
            <TopicBanner topicoNome='PROFESSOR' />
            <TopicSection 
                title='Auxílios Financeiros' 
                body={AuxiliosFinanceiros()} 
                style={{backgroundColor: MARMORE}}
                />
        </div>
    );
}

export default Professor;