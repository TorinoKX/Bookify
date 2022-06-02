import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Virtual } from 'swiper'
import Card from '../Card/Card';
import 'swiper/css'

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Swiper modules={[Virtual]} spaceBetween={50} slidesPerView={3} virtual>
                {this.props.slides.map((slide, index) => {
                    return <SwiperSlide
                        key={slide + index}
                        virtualIndex={index}>
                        <Card slide={slide} isLoggedIn={this.props.isLoggedIn} />
                    </SwiperSlide>
                })}
            </Swiper>
        );
    }
}

Slider.propTypes = {};

export default Slider;
