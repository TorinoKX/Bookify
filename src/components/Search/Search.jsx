import React from 'react';
import { useState } from 'react';
// import PropTypes from 'prop-types';
import * as Google from '../../models/Google'
import Bookslist from '../BooksList/Bookslist';

const Search = () => {
    const [input, setInput] = useState("");
    const [booksToDisplay, setBooks] = useState([])

    let search = async () => {
        let books = await Google.searchBookByName(input);
        setBooks(books)
    }

    let handleChange = (event) => {
        setInput(event.target.value)
    }

    let keyHandler = (event) => {
        if (event.keyCode === 13) {
            search();
        }
    }

    return (
        <div className="Search">
            <div>
                <input type="text" id="search-input" onChange={handleChange} onKeyDown={keyHandler.bind(this)} /><br />
                <button id="search-btn" onClick={search}>Search</button>
            </div>
            <Bookslist books={booksToDisplay}/>
        </div>
    );
};

Search.propTypes = {};

export default Search;