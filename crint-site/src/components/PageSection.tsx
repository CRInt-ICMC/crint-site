import { ReactNode, useState } from 'react';
import { Interweave } from 'interweave';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import AnimateHeight from 'react-animate-height';
import './PageSection.scss'

const PageSection = (props: { id: string, title: string, body: string | ReactNode, textColor?: string, backgroundColor?: string, api?: boolean, mobile?: boolean}) => {
    const [collapsed, setCollapsed] = useState(props.mobile ?? false);

    const textColor = props.textColor ?? '#000';
    const backgroundColor = props.backgroundColor ?? '#FFF';

    return (
            <section id={props.id} className='section-root' style={{ color: textColor, background: backgroundColor }}>
                <div style={{ paddingBottom: collapsed ? '0' : '50px' }}>
                    <h1 className='section-title' onClick={() => { setCollapsed(!collapsed) }}>
                    <div>{`${props.title}`}</div>
                        <button>
                            <FontAwesomeIcon icon={collapsed ? faCaretDown : faCaretUp} size='2x' color={textColor} />
                        </button>
                    </h1>
                    <AnimateHeight height={collapsed ? 0 : 'auto'} duration={500} className='section-content'>
                        {props.api ? <Interweave content={String(props.body)} allowElements /> : props.body}
                    </AnimateHeight>
                </div>
            </section>
        )
}

export default PageSection;