import React , { useState , setState } from 'react';

import './style.css';

/**
* @description - Created a react hook to show experience in, this is after all a CV project.
*/

const NiceSelect = (props) => {

	let [ value , setValue ] = useState(null);
	let [ isOpen , ToggleOpen ] = useState(false); 

	let [ filterValue , ApplyFilter ] = useState("");

	console.log(props);
	return (
		<div onClick={(ev) => { ToggleOpen(!isOpen) }} className={"nice-select" + (isOpen ? " open": "")}>
			<div className="visible">
				{props.defaultText ? props.defaultText : !value ? "Choose Item" : value}
			</div>
			<div className="items">
				<div class="filter-items">
					<input onClick={(event) => { event.stopPropagation(); }} placeHolder="Filter" type="text" onInput={(ev) => { ApplyFilter(this.value); }}/>
				</div>
				{props.options.map((item , idx , setValue) => { return NiceSelectItem(item , value); })}
			</div>
		</div>
	)
};
const ToggleOpen = (isOpen) => {
	return !isOpen;
}
const NiceSelectItem = (item , currentValue , onChange) => {
	return (
		<div onClick={(ev) => { onChange(item) }} class={"option" + currentValue == item.value ? " active" : ""}><i className={"fas fa-" + item.icon}></i> {item.label}</div>
	)
};



export default NiceSelect;