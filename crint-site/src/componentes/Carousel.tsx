import { ReactNode } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';

const Carousel = (props : {body : ReactNode[]}) => {

    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            direction='horizontal'
            loop={true}

            navigation
            pagination={{ clickable: true }}
            >
            {
                props.body.map((slide) => {
                    return(
                        <SwiperSlide key={String(slide)}>{slide}</SwiperSlide>
                    );
                })
            }
        </Swiper>
    );
}

export default Carousel;