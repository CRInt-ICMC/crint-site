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
import { Grid } from '@mui/material';
import AnimateHeight, { Height } from 'react-animate-height';
import './PageBanner.scss';

const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
}

const createSummary = (pageSections: SectionLink[], cut?: boolean) => {
    let summary = pageSections.map((section) => (
        <Grid item md={4} key={section.name} onClick={() => scrollToElement(section.id)} >
            <FontAwesomeIcon icon={faArrowRight} />
            <span>{section.name}</span>
        </Grid>
    ));

    if (cut) {
        summary = summary.slice(0, 3);
        summary.push(
            <div key='more'>
                <FontAwesomeIcon icon={faEllipsis} style={{paddingLeft: '5%'}} />
            </div>
        );
    }

    return (
        <Grid container className='banner-summary'>
            {summary}
        </Grid>
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
            <Grid container spacing={1} className='banner-body'>
                <Grid item xs={4} md={3.5} className='banner-img'><img src={props.bannerImage || ''} /></Grid>
                <Grid item xs={8} md={8.5} className='banner-title'>
                    <h1>{props.pageName}</h1>

                    <AnimateHeight height={height} contentRef={contentDiv} onMouseEnter={() => expandSummary()} onMouseLeave={() => collapseSummary()} >
                        {summary}
                    </AnimateHeight>
                </Grid>
            </Grid>
        </section>
    );
}

export default PageBanner;