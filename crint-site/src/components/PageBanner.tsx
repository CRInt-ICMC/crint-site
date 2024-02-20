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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import './PageBanner.scss';
import AnimateHeight, { Height } from 'react-animate-height';

const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
}

const createSummary = (pageSections: SectionLink[], cut?: boolean) => {
    let summary = pageSections.map((section) => (
        <div key={section.name} onClick={() => scrollToElement(section.id)} >
            <FontAwesomeIcon icon={faArrowRight} />
            <span>{section.name}</span>
        </div>
    ));

    if (cut) {
        summary = summary.slice(0, 2);
        summary.push(
            <div key='more'>
                <FontAwesomeIcon icon={faEllipsis} style={{paddingLeft: '5%'}} />
            </div>
        );
    }

    return (
        <div className='banner-summary'>
            {summary}
        </div>
    );
}

const PageBanner = (props: { pageName: string, pageSections: SectionLink[], bannerImage?: string, bannerGradient?: string }) => {
    const [summary, setSummary] = useState(createSummary(props.pageSections, props.pageSections.length > 3 ? true : false));
    const [height, setHeight] = useState<Height>('auto');

    const contentDiv = useRef<HTMLDivElement | null>(null);

    // Observa o tamanho do conteúdo para atualizar a altura do banner quando o sumário é atualizado
    useEffect(() => {
        const element = contentDiv.current as HTMLDivElement;

        const resizeObserver = new ResizeObserver(() => {
            setHeight(element.clientHeight);
        });

        resizeObserver.observe(element);

        return () => resizeObserver.disconnect();
    }, []);

    // Atualiza o sumário quando a página muda
    useEffect(() => {
        setSummary(createSummary(props.pageSections, props.pageSections.length > 3 ? true : false));
    }, [props.pageName])

    // Atualiza o sumário quando o mouse entra ou sai do banner
    const expandSummary = () => setSummary(createSummary(props.pageSections, false));
    const collapseSummary = () => setSummary(createSummary(props.pageSections, props.pageSections.length > 3 ? true : false));

    return (
        <section className='banner-root' style={{ background: props.bannerGradient || '' }}>
            <div className='banner-body'>
                <div className='banner-img'><img src={props.bannerImage || ''} /></div>
                <div className='banner-title'>
                    <h1>{props.pageName}</h1>

                    <AnimateHeight height={height} contentRef={contentDiv} onMouseEnter={() => expandSummary()} onMouseLeave={() => collapseSummary()} >
                        {summary}
                    </AnimateHeight>
                </div>
            </div>
        </section>
    );
}

export default PageBanner;