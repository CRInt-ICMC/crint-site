import './TopicBanner.css';
import { ICMC_PRETO } from '../utils/appImages';

const TopicBanner = (props : { topicoNome : string, topicoImage? : string}) => {
    const defaultImage : string = props.topicoImage || ICMC_PRETO;

    return (
        <section className="topic-header">
            <section className='topic-banner'>
                <img src={defaultImage} alt="" />
                <h1>{props.topicoNome}</h1>
            </section>
        </section>
    );
}

export default TopicBanner;