import { ICMC_PRETO } from '../utils/appImages';
import { CSSProperties } from 'react';
import './TopicBanner.scss';

const TopicBanner = (props : { topicoNome : string, topicoImage? : string, style? : CSSProperties}) => {
    const defaultImage : string = props.topicoImage || ICMC_PRETO;
    const defaultStyle : CSSProperties = props.style || {}


    return (
        <section className="topic-header">
            <section className='topic-banner'>
                <img src={defaultImage} alt="" />
                <h1 style={defaultStyle}>{props.topicoNome}</h1>
            </section>
        </section>
    );
}

export default TopicBanner;