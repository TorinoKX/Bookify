import React from 'react';
import './BookDetails.css';
// import PropTypes from 'prop-types';

const BookDetails = (props) => {
	return (
		<div className="BookDetails">
			<button className="CloseDetails" onClick={() => { props.closeCallback(); }}>X</button>.
			<div className="DetailBody">
				<img className="DetailImg" src={props.book.book_image} alt={props.book.title}></img>
				<div className="DetailContent">
					<h2 className="DetailTitle">{props.book.title}</h2>
					<h3 className="DetailAuthor">By {props.book.author}</h3>
					<p className="DetailDesc">{props.book.description}</p>
					<p className="DetailPub">Published By: {props.book.publisher}</p>
				</div>
				<div className="DetailButtons">
					<button className={props.isBookshelf ? 'AddLibrary bookShelf' : 'AddLibrary'} onClick={() => { props.addToLibrary(props.book.isbns[0].isbn13); }}>Add To Favorites</button>
					<a href={props.book.buy_links[0].url} target="_blank" rel="noreferrer"><button className={props.isBookshelf ? 'StorePage bookShelf' : 'StorePage'}>Go To Storepage</button></a>
				</div>
			</div>
		</div>
	);
};

BookDetails.propTypes = {};

export default BookDetails;