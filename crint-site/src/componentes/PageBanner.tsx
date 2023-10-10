import { useContext } from 'react';
import { SettingsContext } from '../Contexto';
import './PageBanner.scss';

const PageBanner = (props: { pageName: string, pageSections: sectionLink[], bannerImage?: string, bannerGradient?: string }) => {
    const image: string = props.bannerImage || '';
    const gradient: string = props.bannerGradient || ''

    const { userSettings } = useContext(SettingsContext);

    return (
        <section className='page-root' style={{ background: gradient }}>
            <div className='page-banner'>
                <div className='page-img-container'><img src={image} /></div>
                <div className='page-title'>
                    <h1 style={{ fontSize: (userSettings?.fontSizeMod || 1) + 'em' }}>{props.pageName}</h1>
                    <div className='page-summary'>
                        {props.pageSections.map((section) => {
                            return (
                                <a key={section.name} href={'#' + section.id}>{'>' + section.name}</a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PageBanner;