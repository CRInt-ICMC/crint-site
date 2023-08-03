import TopicBanner from '../../components/TopicBanner';
import WIP_page from '../wip';
import './pesquisa.css'


const Pesquisa = () => {
    return (
        <div id='pesquisa-root'>
            <TopicBanner topicoNome='PESQUISA' />
            <WIP_page />
        </div>
    );
}

export default Pesquisa;