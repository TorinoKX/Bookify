import React from 'react';
import Slider from '../Slider/Slider';
import './Bestsellers.css';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown/Dropdown';

function Bestsellers(props) {
	return (
		<div className="Bestsellers">
			<div className="ListTitle">
				<h1>Bestselling {props.list.name}</h1>
			</div>
			{props.list.books &&
                <Slider slides={props.list.books} callback={ props.callback } />
			}
			<Dropdown items={props.allLists} callback={props.changeList} />
		</div>
	);

}

Bestsellers.propTypes = {
	list: PropTypes.array,
	allLists: PropTypes.array,
	changeList: PropTypes.func
};

export default Bestsellers;
