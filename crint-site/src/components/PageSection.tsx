import { useState } from 'react';
import { Interweave } from 'interweave';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import AnimateHeight from 'react-animate-height';
import './PageSection.scss'

const PageSection = (props: { id: string, title: string, body: string, textColor: string, backgroundColor: string }) => {
    const [collapse, setCollapse] = useState(false);

    return (
        <section id={props.id} className='page-section' style={{ color: props.textColor, background: props.backgroundColor }}>
            <div style={{ paddingBottom: collapse ? '0' : '50px' }}>
                <h1 className='section-title' onClick={() => { setCollapse(!collapse) }}>
                    <div>{`${props.title}`}</div>
                    <button>
                        <FontAwesomeIcon icon={collapse ? faCaretDown : faCaretUp} size='2x' color={props.textColor} />
                    </button>
                </h1>
                <AnimateHeight height={collapse ? 0 : 'auto'} duration={500} className='section-content'>
                    <Interweave content={props.body} allowElements />
                </AnimateHeight>
            </div>
        </section>
    )
}

export default PageSection;