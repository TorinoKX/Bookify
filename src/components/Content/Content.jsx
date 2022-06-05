import React, { useState, useEffect } from 'react';
import * as Nyt from '../../models/Nyt'
import Bestsellers from '../Bestsellers/Bestsellers';
import Bookshelves from '../Bookshelves/Bookshelves';

function Content() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [allLists, setAllLists] = useState([]);
    const [list, setList] = useState({ name: "", books: [] });
    const [gotSlides, setGotSlides] = useState(false);
    const [accessToken, setAccessToken] = useState("");

    let initLists = () => {
        console.log("initLists")
        Nyt.getLists().then(listData => {
            console.log(listData)
            setAllLists(listData)
            console.log(allLists)
            Nyt.getListBooks(listData[0].list_name_encoded).then(bookData => {
                setList(
                    {
                        name: listData[0].display_name,
                        books: bookData.map(el => {
                            return { name: `${el.title} - ${el.author}`, image: el.book_image };
                        })
                    }
                )
            })
        }).catch(err => console.log(err));
        setGotSlides(true)
    }

    let changeList = (list) => {
        Nyt.getListBooks(list.list_name_encoded).then(bookData => {
            setList(
                {
                    name: list.display_name,
                    books: bookData.map(el => {
                        return { name: `${el.title} - ${el.author}`, image: el.book_image };
                    })
                }
            )
        })
    }

    let checkLoggedIn = () => {
        var urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
        console.log(urlParams)
        if (urlParams.has('access_token')) {
            console.log("true")
            let accessToken = urlParams.get('access_token')
            console.log(accessToken)
            setLoggedIn(true)
            setAccessToken(accessToken)
        }
        else {
            console.log("false")
            setLoggedIn(false)
        }
    }

    useEffect(() => {
        console.log(list);
        console.log(gotSlides);
        if (!gotSlides) {
            initLists();
        }
        checkLoggedIn();
    })

    return (
        <div className="Content">
            <Bestsellers list={list} allLists={allLists} changeList={changeList} />
            <Bookshelves isLoggedIn={isLoggedIn} accessToken={accessToken} />
        </div>
    );
}

Content.propTypes = {};

export default Content;
