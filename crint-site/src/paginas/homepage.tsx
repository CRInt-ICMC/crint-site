import { ReactNode, useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../Contexto';
import { ApiSecaoSecao } from '../utils/generated/contentTypes';
import { DEFAULT_LANGUAGE, STRAPI_API_TOKEN, STRAPI_URL } from '../utils/appConstants';
import TopicSection from '../componentes/TopicSection';
import axios from 'axios';
import './homepage.scss';
import Carousel from '../componentes/Carousel';
import { SwiperSlide } from 'swiper/react';

const CreateCarousel = (carouselImages : image[]) => {
    let carouselBody : ReactNode = (
        <>
            {
                carouselImages.map((image : image) => {
                    return (
                        <SwiperSlide key={image.url} className='swiper-slide'>
                            <div className='slide-caption'>{image.caption}</div>
                            <img src={STRAPI_URL + image.url} />
                        </SwiperSlide>
                    );
                })
            }
        </>
    );

    return carouselBody;
}

interface image {
    url : string,
    caption : string,
}

const Homepage = () => {
    const {userSettings} = useContext(SettingsContext);
    const [carouselImages, setCarouselImages] = useState<image[]>();
    const [sections, setSections] = useState<ApiSecaoSecao[]>();

    // Recebe a imagem de fundo e as seções
    useEffect(() => {
        axios.get(STRAPI_URL + `/api/homepage?populate=*&locale=` + userSettings?.lang || DEFAULT_LANGUAGE, {'headers': {'Authorization': STRAPI_API_TOKEN}})
        .then((response) => {
            let images : image[] = []
            response['data']['data']['attributes']['Carrossel']['data'].map((image : any) => {
                images.push({url: String(image.attributes.url), caption: String(image.attributes.caption)})
            })

            
            setCarouselImages(images);

            setSections(response['data']['data']['attributes']['secoes']['data']);
        })
    }, [userSettings?.lang]);

    return (
        <div className='homepage-body'>
            {/* Carrega a imagem central */}
            <div className='carousel-container'>
                <div className='carousel'>
                    { carouselImages && <Carousel body={CreateCarousel(carouselImages)} /> }
                </div>
            </div>

            {/* Carrega as seções */}
            { sections && 
                sections.map((section) => {
                    return (
                        <TopicSection 
                            key={String(section.attributes.Titulo || '')} 
                            title={String(section.attributes.Titulo || '')}
                            body={String(section.attributes.Corpo || '')}
                            style={{
                                color: String(section.attributes.Cor_texto || ''),
                                backgroundColor: String(section.attributes.Cor_fundo || '')
                            }}
                            />
                    );
                })
            }
        </div>
    )
}

export default Homepage;