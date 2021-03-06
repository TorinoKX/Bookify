import React, { useState, useEffect } from 'react';
import * as Nyt from '../../models/Nyt';
import Bestsellers from '../Bestsellers/Bestsellers';
import Bookshelves from '../Bookshelves/Bookshelves';
import BookDetails from '../BookDetails/BookDetails';
import * as Google from '../../models/Google';
import Search from '../Search/Search';
import './Content.css';

function Content() {

	const [isLoggedIn, setLoggedIn] = useState(false);
	const [allLists, setAllLists] = useState([]);
	const [list, setList] = useState({ name: '', books: [] });
	const [gotSlides, setGotSlides] = useState(false);
	const [accessToken, setAccessToken] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const [chosenBook, setChosenBook] = useState(null);
	const [isBookshelf, setIsBookshelf] = useState(false);

	//sets the chosen book to the raw data of the given book (called from bestseller's children)
	let callback = (book) => {
		setChosenBook(book.raw);
	};

	//clears the chosen book and resets the isBookshelf variable
	let closeCallback = () => {
		setIsBookshelf(false);
		setChosenBook(null);
	};

	//Initialises the Nyt lists and sets the default list to the first one supplied by the api
	let initLists = () => {
		console.log('initLists');
		Nyt.getLists().then(listData => {
			console.log(listData);
			setAllLists(listData);
			console.log(allLists);
			Nyt.getListBooks(listData[0].list_name_encoded).then(bookData => {
				setList(
					{
						name: listData[0].display_name,
						books: bookData.map(el => {
							return { name: `${el.title} - ${el.author}`, image: el.book_image, raw: el };
						})
					}
				);
			});
		}).catch(err => console.log(err));
		setGotSlides(true);
	};

	//changes the displayed list
	let changeList = (list) => {
		Nyt.getListBooks(list.list_name_encoded).then(bookData => {
			setList(
				{
					name: list.display_name,
					books: bookData.map(el => {
						return { name: `${el.title} - ${el.author}`, image: el.book_image, raw: el };
					})
				}
			);
		});
	};

	//Checks if the access token is in the url, if it is then sets the accessToken and loggedIn variables
	let checkLoggedIn = () => {
		var urlParams = new URLSearchParams(window.location.hash.replace('#', '?'));
		console.log(urlParams);
		if (urlParams.has('access_token')) {
			console.log('true');
			let accessToken = urlParams.get('access_token');
			console.log(accessToken);
			setLoggedIn(true);
			setAccessToken(accessToken);
		}
		else {
			console.log('false');
			setLoggedIn(false);
		}
	};

	//Adds a book to user's favorites library based in isbn
	let addToLibrary = (isbn) => {
		if (accessToken) {
			const searchPromise = Google.searchBookByISBN(isbn);
			Promise.all([searchPromise]).then((values) => {
				console.log(values[0]);
				Google.addBookToShelf(0, values[0][0].id, accessToken);
				setRefresh(true);
			});
		}
		else {
			console.log('not logged in');
		}
	};

	//resets the refresh variable to false
	let resetRefresh = () => {
		setRefresh(false);
	};

	//parses a google book into the format used in BookDetails and sets it to the chosen book
	let bookshelfBook = (data) => {
		console.log(data.raw);
		setIsBookshelf(true);
		const volInfo = data.raw.volumeInfo;
		const buyLink = [];
		buyLink.push({url: data.raw.saleInfo.buyLink});
		console.log(buyLink);
		setChosenBook({book_image: volInfo.imageLinks.thumbnail, title: volInfo.title, author: volInfo.authors[0], description: 'Category: ' + volInfo.categories[0], publisher: volInfo.publisher, buy_links: buyLink });
	};

	useEffect(() => {
		console.log(list);
		console.log(gotSlides);
		if (!gotSlides) {
			initLists();
		}
		checkLoggedIn();
	});

	return (
		<div className="Content">
			<h1 className="Title">Bookify</h1>
			<Search />
			<div className="ContentWrapper">
				<Bestsellers list={list} allLists={allLists} changeList={changeList} addToLibrary={addToLibrary} callback={callback} />
				<Bookshelves isLoggedIn={isLoggedIn} accessToken={accessToken} refresh={refresh} resetRefresh={resetRefresh} callback={bookshelfBook} />
			</div>
			{chosenBook &&
                <BookDetails isBookshelf={isBookshelf} book={chosenBook} closeCallback={closeCallback} addToLibrary={addToLibrary} />
			}
		</div>
	);
}

Content.propTypes = {};

export default Content;
