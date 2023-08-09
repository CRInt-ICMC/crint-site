import TopicBanner from '../components/TopicBanner';
// import TopicSection from '../components/TopicSection';
import WIP_page from '../components/wip';
import './mobilidade.scss';

const Mobilidade = () => {
    return (
        <div id="mobilidade-root">
            <TopicBanner topicoNome='MOBILIDADE' />
            <WIP_page />
        </div>
    );
}

export default Mobilidade;