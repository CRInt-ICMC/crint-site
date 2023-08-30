import TopicBanner from '../../components/TopicBanner';
import WIP from '../../components/wip';
import { INFORMACOES_GRADIENTE } from '../../utils/appConstants';
import { INFORMACOES_BANNER } from '../../utils/appImages';
import './convenios.scss'

const Convenios = () => {
    return (
        <div id='convenios-root'>
            <TopicBanner topicoNome='CONVÊNIOS' topicoImage={INFORMACOES_BANNER} style={{background: INFORMACOES_GRADIENTE}} />
            <WIP />
        </div>
    );
}

export default Convenios;