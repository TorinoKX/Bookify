import React from 'react';
import * as Nyt from '../../models/Nyt'
import Bestsellers from '../Bestsellers/Bestsellers';
import Bookshelves from '../Bookshelves/Bookshelves';
//import PropTypes from 'prop-types';
// import GoogleLogin from './GoogleLogin';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            allLists: [],
            list: { name: "", books: [] },
            gotSlides: false,
            accessToken: ""
        };
    }

    componentDidMount() {
        console.log(this.state.list);
        console.log(this.state.gotSlides);
        this.initLists();
        this.checkLoggedIn();
    }

    render() {
        return (
            <div className="Content">
                <Bestsellers list={this.state.list} allLists={this.state.allLists} changeList={this.changeList}/>
                <Bookshelves isLoggedIn={this.state.isLoggedIn} accessToken={this.state.accessToken} />
            </div>
        );
    }

    initLists() {
        console.log("initLists")
        if (!this.state.gotSlides) {
            Nyt.getLists().then(listData => {
                console.log(listData)
                this.setState({allLists: listData})
                console.log(this.state.allLists)
                Nyt.getListBooks(listData[0].list_name_encoded).then(bookData => {
                    this.setState(
                        {
                            list: {
                                name: listData[0].display_name,
                                books: bookData.map(el => {
                                    return { name: `${el.title} - ${el.author}`, image: el.book_image };
                                })
                            }
                        }
                    )
                })
            }).catch(err => console.log(err));
            this.setState({ gotSlides: true })
        }
    }

    changeList = (list) => {
        Nyt.getListBooks(list.list_name_encoded).then(bookData => {
            this.setState(
                {
                    list: {
                        name: list.display_name,
                        books: bookData.map(el => {
                            return { name: `${el.title} - ${el.author}`, image: el.book_image };
                        })
                    }
                }
            )
        })
    }

    checkLoggedIn = () => {
        var urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
        console.log(urlParams)
        if (urlParams.has('access_token')) {
            console.log("true")
            let accessToken = urlParams.get('access_token') 
            console.log(accessToken)
            this.setState({ isLoggedIn: true, accessToken: accessToken }, () => {
                console.log(this.state)
            })
        }
        else {
            console.log("false")
            this.setState({ isLoggedIn: false })
        }
    }
}

Content.propTypes = {};

export default Content;
