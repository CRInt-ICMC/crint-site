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
import { faArrowDown, faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import './PageBanner.scss';

const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
}

const createSummary = (pageSections: SectionLink[]) => (
    <>
        {
            pageSections.map((section) => (
                <div key={section.name} onClick={() => scrollToElement(section.id)}>
                    <FontAwesomeIcon icon={faArrowRight} />
                    <span>{section.name}</span>
                </div>
            ))
        }
    </>
)

const PageBanner = (props: { pageName: string, pageSections: SectionLink[], bannerImage?: string, bannerGradient?: string }) => {
    const [summary, setSummary] = useState(createSummary(props.pageSections.slice(0, 3)));
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        setSummary(createSummary(props.pageSections.slice(0, 3)));
        setShowMore(false);
    }, [props.pageSections]);

    const updateSummary = () => {
        setShowMore(!showMore);

        if (!showMore)
            setSummary(createSummary(props.pageSections));
        else
            setSummary(createSummary(props.pageSections.slice(0, 3)));
    }

    return (
        <section className='banner-root' style={{ background: props.bannerGradient || '' }}>
            <div className='banner-body'>
                <div className='banner-img'><img src={props.bannerImage || ''} /></div>
                <div className='banner-title'>
                    <h1>{props.pageName}</h1>
                    <div className='banner-summary'>
                        {summary}
                    </div>
                    {props.pageSections.length > 3 &&
                        <div className='banner-summary-button' onClick={() => updateSummary()}>
                            <span>{showMore ? "Menos" : "Mais" + ' '}</span>
                            <FontAwesomeIcon icon={showMore ? faArrowUp : faArrowDown} />
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}

export default PageBanner;