import TopicBanner from '../../componentes/TopicBanner';
import WIP from '../../componentes/wip';
import { INFORMACOES_GRADIENTE } from '../../utils/appConstants';

const Dia = () => {
    return (
        <div id='dia-root'>

            <TopicBanner 
                topicoNome='Dados de Internacionalização dos Alunos' 
                style={{background: INFORMACOES_GRADIENTE}} 
                />
            <WIP />
        </div>
    );
}

export default Dia;