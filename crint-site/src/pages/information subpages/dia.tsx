import TopicBanner from '../../components/TopicBanner';
import WIP from '../../components/wip';
import { INFORMACOES_GRADIENTE } from '../../utils/appConstants';
import { INFORMACOES_BANNER } from '../../utils/appImages';
import './dia.scss'

const Dia = () => {
    return (
        <div id='dia-root'>

            <TopicBanner topicoNome='Dados de Internacionalização dos Alunos' topicoImage={INFORMACOES_BANNER} style={{background: INFORMACOES_GRADIENTE}} />
            <WIP />
        </div>
    );
}

export default Dia;