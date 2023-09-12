import TopicBanner from '../componentes/TopicBanner';
// import TopicSection from '../components/TopicSection';
import WIP from '../componentes/wip';
import { MOBILIDADE_GRADIENTE } from '../utils/appConstants';
import { MOBILIDADE_BANNER } from '../utils/appImages';

const Mobilidade = () => {
    return (
        <div id="mobilidade-root">
            <TopicBanner 
                topicoNome='MOBILIDADE' 
                topicoImage={MOBILIDADE_BANNER} 
                style={{background: MOBILIDADE_GRADIENTE}} 
                />
            <WIP />
        </div>
    );
}

export default Mobilidade;