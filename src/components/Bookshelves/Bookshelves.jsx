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

    componentDidMount() {
        if (!this.state.bookShelvesLoaded) {
            Google.getBookshelves(this.props.accessToken).then(bookShelves => {
                this.setState({ bookShelves: bookShelves })
            })
        }
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
                        return { name: `${el.title}`, image: "https://i.guim.co.uk/img/media/d305370075686a053b46f5c0e6384e32b3c00f97/0_50_5231_3138/master/5231.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=c83f68b473db6bb72cd8d50beb04addc" };
                    })} />
                }
            </div>
        );
    }



}

Bookshelves.propTypes = {};

export default Bookshelves;
