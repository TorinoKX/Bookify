import React from 'react';
import { useState } from 'react';
import './Dropdown.css'
// import PropTypes from 'prop-types';

const Dropdown = (props) => {

    const [dropdownActive, setDropdown] = useState(false);

    return (
        <div className="Dropdown">
            <div className="Trigger" onClick={() => { setDropdown(!dropdownActive) }}>
                <p>Choose Bestseller List <br /> {dropdownActive ? <span>&#8248;</span> : <span>&#43258;</span>}</p>
            </div>
            <div className={dropdownActive ? "DropdownItems Active" : "DropdownItems"}>
                <ul>
                    {props.items.map((item, index) => {
                        return index <= props.items.length / 2 && <li className="ListItem" key={item + index} onClick={() => { props.callback(item); setDropdown(!dropdownActive) }} >{item.display_name}</li>
                    })}
                </ul>
                <ul>
                    {props.items.map((item, index) => {
                        return index > props.items.length / 2 && <li className="ListItem" key={item + index} onClick={() => { props.callback(item); setDropdown(!dropdownActive) }} >{item.display_name}</li>
                    })}
                </ul>
            </div>
        </div>
    );
};

Dropdown.propTypes = {};

export default Dropdown;