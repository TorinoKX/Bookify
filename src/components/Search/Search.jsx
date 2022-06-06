import React from 'react';
import { useState } from 'react';
import './Search.css'
// import PropTypes from 'prop-types';
import * as Google from '../../models/Google'
import Bookslist from '../BooksList/Bookslist';

const Search = () => {
    const [input, setInput] = useState("");
    const [booksToDisplay, setBooks] = useState([])
    const [isBig, setIsBig] = useState(false)

    let search = async () => {
        let books = await Google.searchBookByName(input);
        setBooks(books)
        console.log(books)
    }

    let handleChange = (event) => {
        setInput(event.target.value)
    }

    let keyHandler = (event) => {
        if (event.keyCode === 13) {
            search();
        }
    }

    let biggenSearch = () => {
        if (!isBig) {
            setIsBig(true)
        }
    }

    return (
        <div className={isBig ? "Search Big" : "Search"}>
            {isBig &&
                <button className="CloseSearch" onClick={() => { setIsBig(false); setBooks([]) }}>X</button>
            }
            {!isBig &&
                <h2 className="SearchTitle">Search</h2>
            }
            <div className="InputContainer">
                <input className={isBig ? "SearchInput Big" : "SearchInput"} type="text" onChange={handleChange} onKeyDown={keyHandler.bind(this)} onClick={() => { biggenSearch() }} />
                {isBig &&
                    <button className="SearchBtn" onClick={search}>Search</button>
                }
            </div>
            <div className="BookslistContainer">
                <Bookslist books={booksToDisplay} />
            </div>
        </div>
    );
};

Search.propTypes = {};

export default Search;