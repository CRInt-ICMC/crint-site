import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../Contexto';
import { ApiSecaoSecao } from '../utils/generated/contentTypes';
import { DEFAULT_LANGUAGE, STRAPI_API_TOKEN, STRAPI_URL } from '../utils/appConstants';
import TopicSection from '../componentes/TopicSection';
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './homepage.scss';

const CreateCarousel = (carouselImages : string[]) => {
    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>

            { 
                carouselImages.map((imageURL : string) => {
                    console.log(imageURL)
                    console.log(imageURL)

                    return (
                        <div className='carousel' key={String(imageURL)}> 
                            <img src={STRAPI_URL + String(imageURL)} />
                        </div>
                    );
                }) 
            }
        </Slider>

    );
}

const Homepage = () => {
    const {userSettings} = useContext(SettingsContext);
    const [carouselImages, setCarouselImages] = useState<string[]>();
    const [sections, setSections] = useState<ApiSecaoSecao[]>();

    // Recebe a imagem de fundo e as seções
    useEffect(() => {
        axios.get(STRAPI_URL + `/api/homepage?populate=*&locale=` + userSettings?.lang || DEFAULT_LANGUAGE, {'headers': {'Authorization': STRAPI_API_TOKEN}})
        .then((response) => {
            let urls : string[] = []
            response['data']['data']['attributes']['Carrossel']['data'].map((image : any) => {
                urls.push(image.attributes.url as string)
            })
            
            setCarouselImages(urls);


            setSections(response['data']['data']['attributes']['secoes']['data']);
        })
    }, [userSettings?.lang]);

    

    return (
        <div className='homepage-body'>
            {/* Carrega a imagem central */}
            <section className='main-section'>
                    { carouselImages && CreateCarousel(carouselImages) }
            </section>
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