import TopicBanner from '../componentes/TopicBanner';
import TopicSection from '../componentes/TopicSection';
import { BEJE_CLARO, INFORMACOES_GRADIENTE } from '../utils/appConstants';
import { INFORMACOES_BANNER } from '../utils/appImages';

const Informacoes = () => {
    return (
        <div id='informacoes-root'>
            {/* <TopicBanner 
                topicoNome='INFORMAÇÕES' 
                topicoImage={INFORMACOES_BANNER} 
                style={{background: INFORMACOES_GRADIENTE}} 
                />
            <TopicSection 
                title='Acordos e Convênios' 
                body={AcordosConvenios()} 
                style={{backgroundColor: BEJE_CLARO}}
                /> 
            <TopicSection 
                title='Oportunidades no Exterior e Editais em Andamento' 
                body={OportunidadesExterior()} 
                style={{backgroundColor: BEJE_CLARO}}
                /> */}
        </div>
    );
}

export default Informacoes;