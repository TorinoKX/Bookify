import React from 'react';
import * as Google from '../../models/Google'
import Slider from '../Slider/Slider';
import './Bookshelves.css'
// import PropTypes from 'prop-types';

class Bookshelves extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookShelves: [],
            bookShelvesLoaded: false
        };
    }

    componentDidUpdate() {
        if (!this.state.bookShelvesLoaded && this.props.accessToken) {
            this.getBookShelves();
        }
    }

    getBookShelves = () => {
        Google.getBookshelves(this.props.accessToken).then(bookShelves => {
            // let parsedShelves = bookShelves.map(bookshelf => {
            //     let books = this.parseBookShelf(bookshelf);
            //     return { ...bookshelf, books: books }
            // })
            this.setState({ bookShelves: bookShelves, bookShelvesLoaded: true })
            console.log(this.state.bookShelves)
        })
    }

    parseBookShelf = async (bookShelf) => {
        let books;
        Google.getBooksFromShelf(bookShelf.id, this.props.accessToken).then((shelfBooks) => {
            books = shelfBooks;
            return books
        });
    }

    render() {
        return (
            <div className="Bookshelves">
                <h1 className="Title">Bookshelves</h1>
                {!this.props.isLoggedIn &&
                    <button onClick={Google.oauthSignIn}>
                        <p>Login</p>
                    </button>
                }
                {this.props.isLoggedIn &&
                    <Slider slides={this.state.bookShelves.map(el => {
                        return { name: `${el.title}`, books: el.books };
                    })} />
                }
            </div>
        );
    }



}

Bookshelves.propTypes = {};

export default Bookshelves;
