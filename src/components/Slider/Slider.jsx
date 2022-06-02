import React from 'react';
// import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper';
import { Virtual } from 'swiper'
import Card from '../Card/Card';
import 'swiper/css'
import 'swiper/css/navigation'
import './Slider.css'

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Swiper navigation={true} className="Slider" modules={[Virtual, Navigation]} spaceBetween={50} slidesPerView={4} virtual centeredSlides={true} centeredSlidesBounds={true}>
                {this.props.slides.map((slide, index) => {
                    return <SwiperSlide
                        key={slide + index}
                        virtualIndex={index}>
                        <Card slide={slide} isLoggedIn={this.props.isLoggedIn} dropDown={this.props.dropDown}/>
                    </SwiperSlide>
                })}
            </Swiper>
        );
    }
}

Slider.propTypes = {};

export default Slider;
