import React from 'react';
// import PropTypes from 'prop-types';

const Bookslist = (props) => {
    return (
        <div className="Bookslist">
            {props.books.map((book, index) => {
                console.log(book)
                return (
                    book.volumeInfo.imageLinks &&
                    <figure key={index}>
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} height="200" width="200" />
                        <figcaption>{book.volumeInfo.title}</figcaption>
                    </figure>
                );
            })}
        </div>
    );
};

Bookslist.propTypes = {};

export default Bookslist;