import { useContext } from 'react';
import { SettingsContext } from '../Contexto';
import './PageBanner.scss';

const PageBanner = (props: { pageName: string, topicImage?: string, bannerGradient?: string }) => {
    const defaultImage: string = props.topicImage || '';
    const defaultBannerGradient: string = props.bannerGradient || ''

    const { userSettings } = useContext(SettingsContext);

    return (
        <section className='page-root'>
            <section className='page-banner' style={{background: defaultBannerGradient}}>
                <div className='page-img-container'><img src={defaultImage}/></div>
                <h1 style={{ fontSize: (userSettings?.fontSizeMod || 1) + 'em' }}>{props.pageName}</h1>
                <div className='page-summary'></div>
            </section>
        </section>
    );
}

export default PageBanner;