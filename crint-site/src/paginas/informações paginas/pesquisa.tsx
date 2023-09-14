import TopicBanner from '../../componentes/TopicBanner';
import WIP from '../../componentes/wip';
import { INFORMACOES_GRADIENTE } from '../../utils/appConstants';

const Pesquisa = () => {
    return (
        <div id='pesquisa-root'>
            <TopicBanner 
                topicoNome='PESQUISA' 
                style={{background: INFORMACOES_GRADIENTE}} 
                />
            <WIP />
        </div>
    );
}

export default Pesquisa;