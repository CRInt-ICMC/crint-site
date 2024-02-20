// This file is part of CRInt-site.

// CRInt-site is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// CRInt-site is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with CRInt-site. If not, see <https://www.gnu.org/licenses/>.

import { ReactNode, useState } from 'react';
import { Interweave } from 'interweave';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import AnimateHeight from 'react-animate-height';
import './PageSection.scss'

const PageSection = (props: { id: string, title: string, body: string | ReactNode, textColor?: string, backgroundColor?: string, api?: boolean, mobile?: boolean }) => {
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
                    {props.api ? <Interweave content={String(props.body)} allowElements allowAttributes /> : props.body}
                </AnimateHeight>
            </div>
        </section>
    )
}

export default PageSection;