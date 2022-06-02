import React from 'react';
import Slider from '../Slider/Slider';
import './Bestsellers.css'
import PropTypes from 'prop-types';
import { useSwiper } from 'swiper/react';

class Bestsellers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        
    }

    render() {
        return (
            <div className="Bestsellers">
                <div className="ListTitle">{this.props.list.name}</div>
                <Slider slides={this.props.list.books}/>
                <ul>
                    {this.props.allLists.map((value, index) => {
                        return <li key={value + index} onClick={() => { this.props.changeList(value) } }>{value.display_name}</li>
                    })}
                </ul>
            </div>
        );
    }
}

Bestsellers.propTypes = {
    list: PropTypes.array,
    allLists: PropTypes.array,
    changeList: PropTypes.func
};

export default Bestsellers;
