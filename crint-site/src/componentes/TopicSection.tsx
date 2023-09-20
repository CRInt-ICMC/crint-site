import { CSSProperties, useContext } from 'react';
import { SettingsContext } from '../Contexto';
import { Interweave } from 'interweave';
import './TopicSection.scss'

const TopicSection = (props : {title : string, body : string, style? : CSSProperties}) => {
    const {userSettings} = useContext(SettingsContext);

    return (
        <section className='topic-section' style={props.style}>
            <div style={{fontSize: (userSettings?.fontSizeMod || 1) + 'em'}}>
                <h1 className='topic-title'>{`${props.title}`}</h1>
                <Interweave content={props.body} />
            </div>
        </section>
    )
}

export default TopicSection;