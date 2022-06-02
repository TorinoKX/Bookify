import React from 'react';
import './Card.css';
//import PropTypes from 'prop-types';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div onClick={() => {if (this.props.book) { this.props.dropDown(this.props.book) }}} className="Card">
                <div className="CardImage">
                    <img className="Image" src={this.props.slide.image} alt="/" />
                </div>
                <h2 className="CardName">
                    {this.props.slide.name}
                </h2>
            </div>
        );
    }
}

Card.propTypes = {};

export default Card;
