import TopicBanner from '../../componentes/TopicBanner';
import WIP from '../../componentes/wip';

const Pesquisa = () => {
    return (
        <div id='pesquisa-root'>
            <TopicBanner 
                topicoNome='PESQUISA' 
                />
            <WIP />
        </div>
    );
}

export default Pesquisa;