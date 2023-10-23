import { useEffect, useState } from 'react';
import { STRAPI_API_TOKEN, STRAPI_URL } from '../utils/appConstants';
import TopicSection from './PageSection';
import axios from 'axios';
import Carousel from './Carousel';
import { SwiperSlide } from 'swiper/react';
import { useSettings } from '../utils/utils';
import { ApiSecao, ApiSlide } from '../utils/types';
import './Homepage.scss';
import { readCache, setCache } from '../Caching';

const CreateSlides = (carouselImages: ApiSlide[]) => (
    <>
        {carouselImages.map((slide: ApiSlide) => {
            const key = String(slide.attributes.createdAt);
            const link = String(slide.attributes.Link);
            const caption = String(slide.attributes.Texto);
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

        if (cacheHomepage)
            setSections(cacheHomepage);

        else
            axios
                .get(STRAPI_URL + `/api/homepage?populate=*&locale=` + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                .then((response) => {
                    const data = response['data']['data']['attributes']['secoes']['data'];
                    setSections(data);
                    setCache('homepage' + userSettings.lang, data);
                })

                if (cacheCarousel)
                    setCarouselImages(cacheCarousel);
        
                else
                    axios
                        .get(STRAPI_URL + `/api/slides?populate=*&locale=` + userSettings.lang, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
                        .then((response) => {
                            const slidesData: ApiSlide[] = response['data']['data'];
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