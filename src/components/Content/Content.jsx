import React from 'react';
import * as Nyt from '../../models/Nyt'
import Slider from '../Slider/Slider'
//import PropTypes from 'prop-types';
// import GoogleLogin from './GoogleLogin';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            slides: [],
            gotSlides: false
        };
    }

    componentDidMount() {
        console.log(this.state.slides);
        console.log(this.state.gotSlides);
        this.initLists();
        // this.checkLoggedIn();
    }

    render() {
        return (
            <div className="Content">
                <Slider slides={this.state.slides}/>
            </div>
        );
    }

    initLists() {
        console.log("initLists")
        if (!this.state.gotSlides) {
            Nyt.getLists().then(data => {
                let slides = data.map(function (obj) {
                    return {
                         name: obj.display_name,
                         image: 'https://nytimes.com/vi-assets/static-assets/NYT-BestSeller-1200x675-699eb842421d5076f318fe0df3d903a5.png'
                     };
                 });
                this.setState({ slides: slides })
                console.log(slides);
            }).catch(err => console.log(err));
            this.setState({ gotSlides: true })
        }
    }

    checkLoggedIn = () => {
        var urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
        console.log(urlParams)
        if (urlParams.has('access_token')) {
            console.log("true")
            this.setState({ isLoggedIn: true })
        }
        else {
            console.log("false")
            this.setState({ isLoggedIn: false })
        }
    }
}

Content.propTypes = {};

export default Content;
