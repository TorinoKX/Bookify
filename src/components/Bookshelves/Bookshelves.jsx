import React, { useState, useEffect } from 'react';
import * as Google from '../../models/Google'
import Bookslist from '../BooksList/Bookslist';
import DeleteModal from '../DeleteModal/DeleteModal';
import Slider from '../Slider/Slider';
import './Bookshelves.css'

function Bookshelves(props) {
    const [bookShelves, setBookshelves] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [bookshelf, setBookshelf] = useState(null)
    const [displayDeleteModal, setDelete] = useState(false)
    const [bookToDelete, setBookToDelete] = useState(null)

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

    let deleteConfirmed = (confirmed) => {
        if (confirmed) {
            setBookshelf({ id: bookshelf.id, name: bookshelf.name, books: bookshelf.books.filter(el => el.id !== bookToDelete) })
            Google.removeBookFromShelf(bookshelf.id, bookToDelete, props.accessToken);
            getBookShelves();
        }
        setDelete(false);
        setBookToDelete(null);
    }

    let confirmDelete = (bookID) => {
        console.log(bookID)
        setDelete(true);
        setBookToDelete(bookID);
    }

    let dropDown = (bookshelf) => {
        console.log(bookshelf)
        setBookshelf(bookshelf)
    }

    useEffect(() => {
        if (!isLoaded && !isLoading && props.accessToken) {
            console.log("bookshelves useEffect")
            getBookShelves();
        }
    });

    return (
        <div className="Bookshelves">
            <h1 className="ShelvesTitle">Bookshelves</h1>
            {!props.isLoggedIn &&
                <button onClick={Google.oauthSignIn}>
                    <p>Login</p>
                </button>
            }
            {props.isLoggedIn &&
                <Slider slides={bookShelves.map(el => {
                    return { name: `${el.title}`, books: el.books, id: el.id };
                })} callback={dropDown} />
            }
            {bookshelf &&
                <Bookslist books={bookshelf.books} title={bookshelf.name} callback={confirmDelete} />
            }
            {displayDeleteModal &&
                <DeleteModal callback={deleteConfirmed} />
            }
        </div>
    );
}

Bookshelves.propTypes = {};

export default Bookshelves;
