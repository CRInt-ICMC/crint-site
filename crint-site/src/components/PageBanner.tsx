import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './PageBanner.scss';

const PageBanner = (props: { pageName: string, pageSections: SectionLink[], bannerImage?: string, bannerGradient?: string }) => {
    const scrollToElement = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
    }

    const summary = (
        <div className='banner-summary'>
            {props.pageSections.map((section) => (
                <div key={section.name} onClick={() => scrollToElement(section.id)}>
                    <FontAwesomeIcon icon={faArrowRight} />
                    <span>{section.name}</span>
                </div>
            ))}
        </div>
    );

    return (
        <section className='banner-root' style={{ background: props.bannerGradient || '' }}>
            <div className='banner-body'>
                <div className='banner-img'><img src={props.bannerImage || ''} /></div>
                <div className='banner-title'>
                    <h1>{props.pageName}</h1>
                    {summary}
                </div>
            </div>
        </section>
    );
}

export default PageBanner;