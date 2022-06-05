import React from 'react';
import './Card.css';
//import PropTypes from 'prop-types';

function Card(props) {

    return (
        <div onClick={() => { props.callback(props.slide) }} className="Card">
            <div className="CardImage">
                {props.slide.image &&
                    <img className="Image" src={props.slide.image} alt="/" />
                }
                {props.slide.books && (props.slide.books.length < 3) && (props.slide.books.length > 0) &&
                    <img className="BookImage" src={props.slide.books[0].volumeInfo.imageLinks.thumbnail} alt="/" />
                    // <div className="Row">
                    //     <div className="Column">

                    //     </div>
                    // </div>
                }
            </div>
            <h2 className="CardName">
                {props.slide.name}
            </h2>
        </div>
    );
}

Card.propTypes = {};

export default Card;
