import TopicBanner from '../../componentes/TopicBanner';
import WIP from '../../componentes/wip';
import { INFORMACOES_GRADIENTE } from '../../utils/appConstants';
import { INFORMACOES_BANNER } from '../../utils/appImages';

const Convenios = () => {
    return (
        <div id='convenios-root'>
            <TopicBanner topicoNome='CONVÊNIOS' topicoImage={INFORMACOES_BANNER} style={{background: INFORMACOES_GRADIENTE}} />
            <WIP />
        </div>
    );
}

export default Convenios;