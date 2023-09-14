import { CSSProperties } from 'react';
import './TopicBanner.scss';

const TopicBanner = (props : { topicoNome : string, topicoImage? : string, style? : CSSProperties}) => {
    const defaultImage : string = props.topicoImage || '';
    const defaultStyle : CSSProperties = props.style || {}

    return (
        <section className="topic-header" style={defaultStyle}>
            <section className='topic-banner' style={defaultStyle}>
                <img src={defaultImage} alt="" />
                <h1>{props.topicoNome}</h1>
            </section>
        </section>
    );
}

export default TopicBanner;