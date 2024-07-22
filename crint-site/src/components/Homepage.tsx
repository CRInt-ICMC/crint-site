// This file is part of CRInt-site.

// CRInt-site is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// CRInt-site is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with CRInt-site. If not, see <https://www.gnu.org/licenses/>.

import { useEffect, useState } from 'react';
import { DEFAULT_LANGUAGE, STRAPI_API_TOKEN, STRAPI_URL } from '../utils/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { updateUserSettings, useLoading, useSettings } from '../utils/utils';
import { ApiHomepage, ApiSection, ApiSlide } from '../utils/types';
import { readCache, setCache } from '../Caching';
import { Pagination, Scrollbar, A11y, Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { useMediaPredicate } from 'react-media-hook';
import PageSection from './PageSection';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/bundle';
import './Homepage.scss';

interface HomepageSlide {
    caption: string;
    url: string;
    imageUrl: string;
}

interface HomepageSection {
    title: string,
    body: string,
    color: string,
    backgroundColor: string,
}

const CreateCarousel = (carouselSlides: HomepageSlide[]) => (
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
        {carouselSlides.map((slide: HomepageSlide) => {
            const link = slide.url;
            const caption = slide.caption;
            const key = link + caption;
            const image = slide.imageUrl;

            return (
                <SwiperSlide key={key} className='swiper-slide'>
                    <a href={link}>
                        <div className='slide-caption'>{caption}</div>
                        <img src={STRAPI_URL + image} />
                    </a>
                </SwiperSlide>
            );
        })}
    </Swiper>
);

const Homepage = () => {
    const context = useSettings();
    const { userSettings } = context;
    const { addLoadingCoins, subLoadingCoins } = useLoading()

    const [carouselImages, setCarouselImages] = useState<HomepageSlide[]>();
    const [sections, setSections] = useState<HomepageSection[]>();


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
                    const raw = response['data']['data'] as ApiHomepage;

                    // Previne o caso catastrófico de não haver conteúdo disponível no idioma selecionado
                    if (raw['attributes'] === undefined) {
                        subLoadingCoins();
                        updateUserSettings(context, { lang: DEFAULT_LANGUAGE });
                        return;
                    }

                    const slidesData: HomepageSlide[] = [];

                    setCarouselImages(slidesData);

                    raw['attributes']['slides']['data'].map((slide: ApiSlide) => {
                        slidesData.push({
                            caption: String(slide['attributes']['Texto']),
                            url: String(slide['attributes']['Link']),
                            imageUrl: String(slide['attributes']['Imagem']['data']['attributes']['url']),
                        });
                    });

                    const sectionsData: HomepageSection[] = [];
                    setCache('carousel' + '-' + userSettings.lang, slidesData);

                    raw['attributes']['secoes']['data'].map((section: ApiSection) => {
                        sectionsData.push({
                            title: String(section['attributes']['Titulo']),
                            body: String(section['attributes']['Corpo']),
                            color: String(section['attributes']['Cor_texto']),
                            backgroundColor: String(section['attributes']['Cor_fundo']),
                        });
                    });

                    setSections(sectionsData);
                    setCache('homepage' + '-' + userSettings.lang, sectionsData);


                    subLoadingCoins();
                });
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
                        <PageSection
                            key={section.title}
                            id={section.title}
                            title={section.title}
                            body={section.body}
                            textColor={section.color}
                            backgroundColor={section.backgroundColor}
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