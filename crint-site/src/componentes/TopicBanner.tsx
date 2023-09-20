import { CSSProperties } from 'react';
import './TopicBanner.scss';

const TopicBanner = (props : { topicoNome : string, topicImage? : string, style? : CSSProperties}) => {
    const defaultImage : string = props.topicImage || '';
    const defaultStyle : CSSProperties = props.style || {}

    return (
        <section className="topic-root">
            <section className='topic-banner' style={defaultStyle}>
                <img src={defaultImage} alt="" />
                <h1>{props.topicoNome}</h1>
            </section>
        </section>
    );
}

export default TopicBanner;