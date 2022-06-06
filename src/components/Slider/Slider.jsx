import React from 'react';
// import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper';
import { Virtual } from 'swiper'
import { Pagination } from 'swiper';
import Card from '../Card/Card';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './Slider.css'

function Slider(props) {
    return (
        <Swiper
            navigation={true}
            pagination={true}
            className="Slider"
            modules={[Virtual, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={2}
            virtual
            centeredSlides={true}
            breakpoints={{
                860: {
                    spaceBetween: 30,
                    slidesPerView: 3
                },
                1232: {
                    spaceBetween: 40,
                    slidesPerView: 4
                }
            }}
        >
            {
                props.slides.map((slide, index) => {
                    return <SwiperSlide
                        key={slide + index}
                        virtualIndex={index}>
                        <Card slide={slide} isLoggedIn={props.isLoggedIn} callback={props.callback} />
                    </SwiperSlide>
                })
            }
        </Swiper >
    );
}

Slider.propTypes = {};

export default Slider;
