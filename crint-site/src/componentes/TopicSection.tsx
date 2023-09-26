import { CSSProperties, useContext, useState } from 'react';
import { SettingsContext } from '../Contexto';
import { Interweave } from 'interweave';
import AnimateHeight from 'react-animate-height';
import './TopicSection.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const TopicSection = (props : {title : string, body : string, style? : CSSProperties}) => {
    const {userSettings} = useContext(SettingsContext);

    const [collapse, setCollapse] = useState(false);

    return (
        <section className='topic-section' style={props.style}>
            <div style={{fontSize: (userSettings?.fontSizeMod || 1) + 'em'}}>
                <h1 className='topic-title'>
                    {`${props.title}`} 
                    <button onClick={()=>{setCollapse(!collapse)}}> <FontAwesomeIcon icon={collapse ? faCaretDown : faCaretUp} /></button>
                </h1>
                {/* <div className='topic-content' style={{transform: collapse ? 'scaleY(0)' : 'scaleY(1)', height: collapse ? 0 : 'fit-content'}}> */}
                <AnimateHeight height={collapse ? 0 : 'auto'} duration={500} className='topic-content'>
                    <Interweave content={props.body} />
                </AnimateHeight>
                {/* </div> */}
            </div>
        </section>
    )
}

export default TopicSection;