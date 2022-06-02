import React from 'react';
//import PropTypes from 'prop-types';
import * as Google from '../models/Google'

class GoogleLogin extends React.Component {

    state = {
        loggedInButtonText: ""
    }

    componentDidMount() {
        this.setState({loggedInButtonText: this.props.loggedIn ? "Logout" : "Login"})
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Google
        Login">
                <button onClick={Google.oauthSignIn}>
                    <p>{this.state.loggedInButtonText}</p>
                </button>
            </div>
        );
    }
}

GoogleLogin.propTypes = {};

export default GoogleLogin;
