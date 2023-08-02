import TopicBanner from '../../components/TopicBanner';
import WIP_page from '../wip';
import './dia.css'

const Dia = () => {
    return (
        <div id='dia-root'>
            <TopicBanner topicoNome='DIA' />
            <WIP_page />
        </div>
    );
}

export default Dia;