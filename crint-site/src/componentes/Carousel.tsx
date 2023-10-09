import { ReactNode } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';

const Carousel = (props: { body: ReactNode }) => {

    return (
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
            {props.body}
        </Swiper>
    );
}

export default Carousel;