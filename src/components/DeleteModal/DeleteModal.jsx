import React from 'react';
import './DeleteModal.css'
// import PropTypes from 'prop-types';

const DeleteModal = (props) => {
    return (
        <div className="DeleteModal">
            <div className="ModalBody">
                <div className="TextContainer">
                    <h2>Are You Sure You Want To Delete This Book?</h2>
                    <p>This Action Is Irreversible</p>
                </div>
                <div className="ButtonContainer">
                    <button className="Cancel" onClick={() => { props.callback(false) }}>Cancel</button>
                    <button className="Confirm" onClick={() => { props.callback(true) }}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

DeleteModal.propTypes = {};

export default DeleteModal;