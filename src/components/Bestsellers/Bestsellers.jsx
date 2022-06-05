import React from 'react';
import Slider from '../Slider/Slider';
import './Bestsellers.css'
import PropTypes from 'prop-types';

function Bestsellers(props) {
    return (
        <div className="Bestsellers">
            <div className="ListTitle">{props.list.name}</div>
            <Slider slides={props.list.books} callback={() => { console.log("callback") }} />
            <ul>
                {props.allLists.map((value, index) => {
                    return <li key={value + index} onClick={() => { props.changeList(value) }}>{value.display_name}</li>
                })}
            </ul>
        </div>
    );

}

Bestsellers.propTypes = {
    list: PropTypes.array,
    allLists: PropTypes.array,
    changeList: PropTypes.func
};

export default Bestsellers;
