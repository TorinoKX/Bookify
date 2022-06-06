import React from 'react';
import Card from '../Card/Card';
import './Bookslist.css';
// import PropTypes from 'prop-types';

const Bookslist = (props) => {

	return (
		<div className="Bookslist">
			<h1>{props.title}</h1>
			<div className="BookCards">
				{props.books.map((book, index) => {
					console.log(book);
					return (
						book.volumeInfo.imageLinks &&
                        <Card slide={{ image: book.volumeInfo.imageLinks.thumbnail, name: book.volumeInfo.title, raw: book }} bookID={book.id} removeCallback={props.removeCallback} callback={props.callback} isBookshelves={props.isBookshelves} />
					);
				})}
			</div>
		</div>
	);
};

Bookslist.propTypes = {};

export default Bookslist;