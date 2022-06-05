import React from 'react';
// import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper';
import { Virtual } from 'swiper'
import Card from '../Card/Card';
import 'swiper/css'
import 'swiper/css/navigation'
import './Slider.css'

function Slider(props) {
    return (
        <Swiper navigation={true} className="Slider" modules={[Virtual, Navigation]} spaceBetween={50} slidesPerView={4} virtual centeredSlides={true} centeredSlidesBounds={true}>
            {props.slides.map((slide, index) => {
                return <SwiperSlide
                    key={slide + index}
                    virtualIndex={index}>
                    <Card slide={slide} isLoggedIn={props.isLoggedIn} callback={props.callback} />
                </SwiperSlide>
            })}
        </Swiper>
    );
}

Slider.propTypes = {};

export default Slider;
