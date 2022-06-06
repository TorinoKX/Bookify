import React from 'react';
import './Card.css';
import placeholderImage from '../../images/placeholder-image.png';
//import PropTypes from 'prop-types';

function Card(props) {

	return (
		<div onClick={() => { props.callback(props.slide); console.log(props); }} className="Card">
			{props.isBookshelves &&
                <button className="RemoveButton" onClick={() => { props.removeCallback(props.bookID); }}>X</button>
			}
			<div className="CardContent">
				<div className="CardImage">
					{props.slide.image &&
                        <img className="img" src={props.slide.image} alt={props.slide.name} />
					}
					{props.slide.books && (props.slide.books.length < 4) && (props.slide.books.length > 0) &&
                        <img className="img" src={props.slide.books[0].volumeInfo.imageLinks.thumbnail} alt={props.slide.books[0].volumeInfo.title} />
					}
					{props.slide.books && (props.slide.books.length >= 4) && (props.slide.books.length > 0) &&
                        <div className="Row img" >
                        	<div className="Column">
                        		{props.slide.books[0].volumeInfo && props.slide.books[0].volumeInfo.imageLinks && 
                                    <img src={props.slide.books[0].volumeInfo.imageLinks.thumbnail} alt={props.slide.books[0].volumeInfo.title}></img>
                        		}
                        		{props.slide.books[1].volumeInfo && props.slide.books[1].volumeInfo.imageLinks && 
                                    <img src={props.slide.books[1].volumeInfo.imageLinks.thumbnail} alt={props.slide.books[1].volumeInfo.title}></img>
                        		}
                        	</div>
                        	<div className="Column">
                        		{props.slide.books[2].volumeInfo && props.slide.books[2].volumeInfo.imageLinks && 
                                    <img src={props.slide.books[2].volumeInfo.imageLinks.thumbnail} alt={props.slide.books[2].volumeInfo.title}></img>
                        		}
                        		{props.slide.books[3].volumeInfo && props.slide.books[3].volumeInfo.imageLinks && 
                                    <img src={props.slide.books[3].volumeInfo.imageLinks.thumbnail} alt={props.slide.books[3].volumeInfo.title}></img>
                        		}
                        	</div>
                        </div>
					}
					{!props.slide.image && props.slide.books.length === 0 &&
                        <img className="img" src={placeholderImage} alt="placeholder" />
					}
				</div>
				<h3 className="CardName">
					{props.slide.name}
				</h3>
			</div>
		</div>
	);
}

Card.propTypes = {};

export default Card;
