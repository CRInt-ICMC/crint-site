import { useEffect, useState } from 'react';
import { DEFAULT_LANGUAGE, STRAPI_API_TOKEN, STRAPI_URL } from './utils/appConstants';
import TopicSection from './componentes/PageSection';
import axios from 'axios';
import './homepage.scss';
import Carousel from './componentes/Carousel';
import { SwiperSlide } from 'swiper/react';
import { useSettings } from './utils/utils';
import { ApiSecao } from './utils/types';

const CreateCarousel = (carouselImages: image[]) => (
    <>
        {carouselImages.map((image: image) => {
            return (
                <SwiperSlide key={image.url} className='swiper-slide'>
                    <a href={image.link}>
                        <div className='slide-caption'>{image.caption}</div>
                        <img src={STRAPI_URL + image.url} />
                    </a>
                </SwiperSlide>
            );
        })}
    </>
);

interface image {
    url: string,
    caption: string,
    link: string,
}

const Homepage = () => {
    const { userSettings } = useSettings();
    const [carouselImages, setCarouselImages] = useState<image[]>();
    const [sections, setSections] = useState<ApiSecao[]>();

    // Recebe a imagem de fundo e as seções
    useEffect(() => {
        axios
            .get(STRAPI_URL + `/api/homepage?populate=*&locale=` + userSettings.lang || DEFAULT_LANGUAGE, { 'headers': { 'Authorization': STRAPI_API_TOKEN } })
            .then((response) => {
                let images: image[] = []
                response['data']['data']['attributes']['Carrossel']['data'].map((image: any) => {
                    images.push({
                        url: String(image.attributes.url),
                        caption: String(image.attributes.caption),
                        link: String(image.attributes.alternativeText),
                    })
                })

                setCarouselImages(images);

                setSections(response['data']['data']['attributes']['secoes']['data']);
            })
    }, [userSettings.lang]);

    return (
        <div className='homepage-body'>
            {/* Carrega a imagem central */}
            <div className='carousel-container'>
                <div className='carousel'>
                    {carouselImages && <Carousel body={CreateCarousel(carouselImages)} />}
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