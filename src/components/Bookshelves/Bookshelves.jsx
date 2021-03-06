import React, { useState, useEffect } from 'react';
import * as Google from '../../models/Google';
import Bookslist from '../BooksList/Bookslist';
import DeleteModal from '../DeleteModal/DeleteModal';
import Slider from '../Slider/Slider';
import './Bookshelves.css';

function Bookshelves(props) {
	const [bookShelves, setBookshelves] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [bookshelf, setBookshelf] = useState(null);
	const [displayDeleteModal, setDelete] = useState(false);
	const [bookToDelete, setBookToDelete] = useState(null);

	//Gets user's google bookshelves and attaches the books for each shelf (used for images and the bookslist)
	let getBookShelves = async () => {
		setIsLoading(true);
		const retrievedBookshelves = await Google.getBookshelves(props.accessToken);
		let shelvesParsed = 0;
		retrievedBookshelves.forEach(async bookshelf => {
			let books = await Google.getBooksFromShelf(bookshelf.id, props.accessToken);
			console.log(books);
			bookshelf.books = books;
			shelvesParsed++;
			if (shelvesParsed === retrievedBookshelves.length) {
				setBookshelves(retrievedBookshelves);
				console.log(retrievedBookshelves);
				setIsLoaded(true);
				setIsLoading(false);
				console.log(bookShelves);
			}
		});
	};

	//If a book deletion was confirmed, will remove the book and refresh the bookshelves, otherwise nothing happens
	let deleteConfirmed = (confirmed) => {
		if (confirmed) {
			setBookshelf({ id: bookshelf.id, name: bookshelf.name, books: bookshelf.books.filter(el => el.id !== bookToDelete) });
			Google.removeBookFromShelf(bookshelf.id, bookToDelete, props.accessToken);
			getBookShelves();
		}
		setDelete(false);
		setBookToDelete(null);
	};

	//preps the book for deletion and enables the delete modal
	let confirmDelete = (bookID) => {
		console.log(bookID);
		setDelete(true);
		setBookToDelete(bookID);
	};

	//sets the bookshelf to be displayed in the dropdown
	let dropDown = (bookshelf) => {
		console.log(bookshelf);
		setBookshelf(bookshelf);
	};

	// eslint-disable-next-line
    useEffect(() => {
		if (!isLoaded && !isLoading && props.accessToken) {
			console.log('bookshelves useEffect');
			getBookShelves();
		}
		if (props.refresh) {
			setBookshelf(null);
			getBookShelves();
			props.resetRefresh();
		}
	});

	return (
		<div className="Bookshelves">
			<h1 className="ShelvesTitle">Bookshelves</h1>
			{props.isLoggedIn &&
				//You cannot log out of the google oauth without signing the user completely out of google, this is my workaround
				<a href="/"><button className="LogoutButton">LogOut</button></a>
			}
			{!props.isLoggedIn &&
                <div className="LoginContainer">
                	<p>Log Into Google Below To View Your Bookshelves.</p>
                	<button className="LoginButton" onClick={Google.oauthSignIn}>Login</button>
                </div>
			}
			{props.isLoggedIn &&
                <Slider slides={bookShelves.map(el => {
                	return { name: `${el.title}`, books: el.books, id: el.id };
                })} callback={dropDown} />
			}
			{bookshelf &&
                <Bookslist books={bookshelf.books} title={bookshelf.name} removeCallback={confirmDelete} callback={props.callback} isBookshelves={true} />
			}
			{displayDeleteModal &&
                <DeleteModal callback={deleteConfirmed} />
			}
		</div>
	);
}

Bookshelves.propTypes = {};

export default Bookshelves;
