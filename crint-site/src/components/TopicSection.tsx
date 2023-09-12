import { CSSProperties, useContext } from 'react';
import './TopicSection.scss'
import { ConfigContext } from '../Context';
import { Interweave } from 'interweave';

const TopicSection = (props : {title : string, body : string, style? : CSSProperties}) => {
    const {userConfig} = useContext(ConfigContext);

    return (
        <section className='topic-section' style={props.style}>
            <div style={{fontSize: (userConfig?.fontSizeMod || 1) + 'em'}}>
                <h1 className='topic-title'>{`${props.title}`}</h1>
                <Interweave content={props.body} />
            </div>
        </section>
    )
}

export default TopicSection;