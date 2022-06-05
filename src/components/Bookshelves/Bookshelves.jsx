import React, { useState, useEffect } from 'react';
import * as Google from '../../models/Google'
import Bookslist from '../BooksList/Bookslist';
import Slider from '../Slider/Slider';
import './Bookshelves.css'

function Bookshelves(props) {
    const [bookShelves, setBookshelves] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [displayedBooks, setDisplayedBooks] = useState([])

    let getBookShelves = async () => {
        setIsLoading(true)
        const retrievedBookshelves = await Google.getBookshelves(props.accessToken);
        let shelvesParsed = 0;
        retrievedBookshelves.forEach(async bookshelf => {
            let books = await Google.getBooksFromShelf(bookshelf.id, props.accessToken);
            console.log(books);
            bookshelf.books = books;
            shelvesParsed++;
            if (shelvesParsed === retrievedBookshelves.length) {
                setBookshelves(retrievedBookshelves);
                console.log(retrievedBookshelves)
                setIsLoaded(true)
                setIsLoading(false)
                console.log(bookShelves)
            }
        })
    }

    let dropDown = (bookshelf) => {
        console.log(bookshelf)
        setDisplayedBooks(bookshelf.books)
    }

    useEffect(() => {
        if (!isLoaded && !isLoading && props.accessToken) {
            console.log("bookshelves useEffect")
            getBookShelves();
        }
    });

    return (
        <div className="Bookshelves">
            <h1 className="Title">Bookshelves</h1>
            {!props.isLoggedIn &&
                <button onClick={Google.oauthSignIn}>
                    <p>Login</p>
                </button>
            }
            {props.isLoggedIn &&
                <Slider slides={bookShelves.map(el => {
                    return { name: `${el.title}`, books: el.books };
                })} callback={dropDown} />
            }
            <Bookslist books={displayedBooks}/>
        </div>
    );
}

Bookshelves.propTypes = {};

export default Bookshelves;
