import TopicBanner from '../../components/TopicBanner';
import WIP from '../../components/wip';
import { INFORMACOES_GRADIENTE } from '../../utils/appConstants';
import { INFORMACOES_BANNER } from '../../utils/appImages';
import './pesquisa.scss'


const Pesquisa = () => {
    return (
        <div id='pesquisa-root'>
            <TopicBanner 
                topicoNome='PESQUISA' 
                topicoImage={INFORMACOES_BANNER} 
                style={{background: INFORMACOES_GRADIENTE}} 
                />
            <WIP />
        </div>
    );
}

export default Pesquisa;