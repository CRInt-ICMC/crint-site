import { useEffect, useState } from 'react';
import { STRAPI_API_TOKEN, STRAPI_URL } from '../utils/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useLoading, useSettings } from '../utils/utils';
import { ApiSecao, ApiSlide } from '../utils/types';
import { readCache, setCache } from '../Caching';
import { Pagination, Scrollbar, A11y, Autoplay, EffectFade, Navigation } from 'swiper/modules';
import TopicSection from './PageSection';
import axios from 'axios';
import './Homepage.scss';
import 'swiper/css';
import 'swiper/css/bundle';
import { useMediaPredicate } from 'react-media-hook';

const CreateCarousel = (carouselSlides: ApiSlide[]) => (
    <Swiper
        modules={[Pagination, Scrollbar, A11y, Autoplay, EffectFade, Navigation]}

        direction='horizontal'
        centeredSlides={true}
        loop={true}

        speed={500}
        effect="fade"
        fadeEffect={{ crossFade: true }}

        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
        }}

        pagination={{ clickable: true }}
        navigation
    >
        {carouselSlides.map((slide: ApiSlide) => {
            const link = String(slide.attributes.Link);
            const caption = String(slide.attributes.Texto);
            const key = link + caption;
            const image = (slide.attributes.Imagem as any)['data']['attributes'] as strapiImageData;

            return (
                <SwiperSlide key={key} className='swiper-slide'>
                    <a href={link}>
                        <div className='slide-caption'>{caption}</div>
                        <img src={STRAPI_URL + image.url} />
                    </a>
                </SwiperSlide>
            );
        })}
    </Swiper>
);

const Homepage = () => {
    const { userSettings } = useSettings();
    const { addLoadingCoins, subLoadingCoins } = useLoading()
    const [carouselImages, setCarouselImages] = useState<ApiSlide[]>();
    const [sections, setSections] = useState<ApiSecao[]>();
    const mobile = useMediaPredicate("(orientation: portrait)");

    // Recebe a imagem de fundo e as seções
    useEffect(() => {
        const cacheHomepage = readCache('homepage' + '-' + userSettings.lang);
        const cacheCarousel = readCache('carousel' + '-' + userSettings.lang);

        if (cacheHomepage && cacheCarousel) {
            setSections(cacheHomepage);
            setCarouselImages(cacheCarousel);
        }

        else {
            addLoadingCoins();

            axios
                .get(STRAPI_URL + `/api/homepage?populate[secoes]=*&populate[slides][populate][0]=Imagem&locale=` + userSettings.lang,
                    { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const data = response['data']['data']['attributes'];

                    const sectionsData = data['secoes']['data'];
                    setSections(sectionsData);
                    setCache('homepage' + '-' + userSettings.lang, sectionsData);

                    const slidesData = data['slides']['data'];

                    setCarouselImages(slidesData);
                    setCache('carousel' + '-' + userSettings.lang, slidesData);
                    subLoadingCoins();
                })
        }
    }, [userSettings.lang]);

    return (
        <div className='homepage-body'>
            {/* Carrega a imagem central */}
            <div className='carousel-container'>
                <div className='carousel'>
                    {carouselImages && CreateCarousel(carouselImages)}
                </div>
            </div>

            {/* Carrega as seções */}
            {sections &&
                sections.map((section) => {
                    return (
                        <TopicSection
                            key={String(section.attributes.Titulo)}
                            id={String(section.attributes.Titulo)}
                            title={String(section.attributes.Titulo)}
                            body={String(section.attributes.Corpo)}
                            textColor={String(section.attributes.Cor_texto)}
                            backgroundColor={String(section.attributes.Cor_fundo)}
                            mobile={mobile}
                            api
                        />
                    );
                })
            }

        </div>
    )
}

export default Homepage;