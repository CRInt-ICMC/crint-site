import { useEffect, useState } from 'react';
import { STRAPI_API_TOKEN, STRAPI_URL } from '../utils/constants';
import TopicSection from './PageSection';
import axios from 'axios';
import Carousel from './Carousel';
import { SwiperSlide } from 'swiper/react';
import { useSettings } from '../utils/utils';
import { ApiSecao, ApiSlide } from '../utils/types';
import './Homepage.scss';
import { readCache, setCache } from '../Caching';

const CreateSlides = (carouselSlides: ApiSlide[]) => (
    <>
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
    </>
);

const Homepage = () => {
    const { userSettings } = useSettings();
    const [carouselImages, setCarouselImages] = useState<ApiSlide[]>();
    const [sections, setSections] = useState<ApiSecao[]>();

    // Recebe a imagem de fundo e as seções
    useEffect(() => {
        const cacheHomepage = readCache('homepage' + userSettings.lang);
        const cacheCarousel = readCache('carousel' + userSettings.lang);

        if (cacheHomepage && cacheCarousel) {
            setSections(cacheHomepage);
            setCarouselImages(cacheCarousel);
        }

        else
            axios
                .get(STRAPI_URL + `/api/homepage?populate[secoes]=*&populate[slides][populate][0]=Imagem&locale=` + userSettings.lang,
                    { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const data = response['data']['data']['attributes'];

                    const sectionsData = data['secoes']['data'];
                    setSections(sectionsData);
                    setCache('homepage' + userSettings.lang, sectionsData);

                    const slidesData = data['slides']['data'];

                    setCarouselImages(slidesData);
                    setCache('carousel' + userSettings.lang, slidesData);
                })
    }, [userSettings.lang]);

    return (
        <div className='homepage-body'>
            {/* Carrega a imagem central */}
            <div className='carousel-container'>
                <div className='carousel'>
                    {carouselImages && <Carousel body={CreateSlides(carouselImages)} />}
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
                        />
                    );
                })
            }
        </div>
    )
}

export default Homepage;