import './TopicBanner.css';
import { ICMC_PRETO } from '../utils/appImages';
import { CSSProperties } from 'react';

const TopicBanner = (props : { topicoNome : string, topicoImage? : string, fontSize? : string}) => {
    const defaultImage : string = props.topicoImage || ICMC_PRETO;
    const defaultFontSize : string = props.fontSize || '6em'


    return (
        <section className="topic-header">
            <section className='topic-banner'>
                <img src={defaultImage} alt="" />
                <h1 style={{fontSize: defaultFontSize}}>{props.topicoNome}</h1>
            </section>
        </section>
    );
}

export default TopicBanner;