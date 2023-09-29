import { CSSProperties, useContext } from 'react';
import { SettingsContext } from '../Contexto';
import './TopicBanner.scss';

const TopicBanner = (props : { topicoNome : string, topicImage? : string, style? : CSSProperties}) => {
    const defaultImage : string = props.topicImage || '';
    const defaultStyle : CSSProperties = props.style || {}

    const {userSettings} = useContext(SettingsContext);

    return (
        <section className='topic-root'>
            <section className='topic-banner' style={defaultStyle}>
                <div className='topic-img-container'><img src={defaultImage} alt="" /></div>            
                <h1 style={{fontSize: (userSettings?.fontSizeMod || 1 )+ 'em'}}>{props.topicoNome}</h1>
            </section>
        </section>
    );
}

export default TopicBanner;