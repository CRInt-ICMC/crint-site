import { useContext } from 'react';
import { SettingsContext } from '../Contexto';
import './PageBanner.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const PageBanner = (props: { pageName: string, pageSections: sectionLink[], bannerImage?: string, bannerGradient?: string }) => {
    const image: string = props.bannerImage || '';
    const gradient: string = props.bannerGradient || ''

    const { userSettings } = useContext(SettingsContext);

    const scrollToElement = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className='page-root' style={{ background: gradient }}>
            <div className='page-banner'>
                <div className='page-img-container'><img src={image} /></div>
                <div className='page-title'>
                    <h1 style={{ fontSize: (userSettings?.fontSizeMod || 1) + 'em' }}>{props.pageName}</h1>
                    <div className='page-summary'>
                        {props.pageSections && props.pageSections.map((section) => {
                            return (
                                <div onClick={()=>{scrollToElement(section.id)}}>
                                    <FontAwesomeIcon key={section.name} icon={faArrowRight} />
                                    <span>{section.name}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PageBanner;