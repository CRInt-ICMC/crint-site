import { useContext } from 'react';
import { SettingsContext } from '../Contexto';
import './TopicBanner.scss';

const TopicBanner = (props: { topicoNome: string, topicImage?: string, bannerGradient?: string }) => {
    const defaultImage: string = props.topicImage || '';
    const defaultBannerGradient: string = props.bannerGradient || ''

    const { userSettings } = useContext(SettingsContext);

    return (
        <section className='topic-root'>
            <section className='topic-banner' style={{background: defaultBannerGradient}}>
                <div className='topic-img-container'><img src={defaultImage}/></div>
                <h1 style={{ fontSize: (userSettings?.fontSizeMod || 1) + 'em' }}>{props.topicoNome}</h1>
                <div className='topic-summary'></div>
            </section>
        </section>
    );
}

export default TopicBanner;