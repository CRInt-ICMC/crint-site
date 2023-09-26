import { useContext, useState } from 'react';
import { SettingsContext } from '../Contexto';
import { Interweave } from 'interweave';
import AnimateHeight from 'react-animate-height';
import './TopicSection.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const TopicSection = (props : {title : string, body : string, textColor : string, backgroundColor : string}) => {
    const {userSettings} = useContext(SettingsContext);

    const [collapse, setCollapse] = useState(false);

    return (
        <section className='topic-section' style={{color: props.textColor, background: props.backgroundColor}}>
            <div style={{fontSize: (userSettings?.fontSizeMod || 1) + 'em'}}>
                <h1 className='topic-title'>
                    {`${props.title}`} 
                    <button onClick={()=>{setCollapse(!collapse)}}> 
                        <FontAwesomeIcon icon={collapse ? faCaretDown : faCaretUp} size='2x' color={props.textColor} />
                    </button>
                </h1>
                <AnimateHeight height={collapse ? 0 : 'auto'} duration={500} className='topic-content'>
                    <Interweave content={props.body} />
                </AnimateHeight>
            </div>
        </section>
    )
}

export default TopicSection;