import { useContext, useState } from 'react';
import { SettingsContext } from '../Contexto';
import { Interweave } from 'interweave';
import AnimateHeight from 'react-animate-height';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import './PageSection.scss'

const PageSection = (props: { id: string, title: string, body: string, textColor: string, backgroundColor: string }) => {
    const { userSettings } = useContext(SettingsContext);
    const [collapse, setCollapse] = useState(false);

    return (
        <section id={props.id} className='page-section' style={{ color: props.textColor, background: props.backgroundColor }}>
            <div style={{ fontSize: (userSettings?.fontSizeMod || 1) + 'em', paddingBottom: collapse ? '0' : '50px' }}>
                <h1 className='page-title' onClick={() => { setCollapse(!collapse) }}>
                    {`${props.title}`}
                    <button>
                        <FontAwesomeIcon icon={collapse ? faCaretDown : faCaretUp} size='2x' color={props.textColor} />
                    </button>
                </h1>
                <AnimateHeight height={collapse ? 0 : 'auto'} duration={500}>
                    <Interweave content={props.body} allowElements />
                </AnimateHeight>
            </div>
        </section>
    )
}

export default PageSection;