import React from 'react';

import './style.css';

export default class NiceSelect extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isOpen: false , 
			value: null
		}
	}
	getItem(item){
		return (
			<div onClick={(ev) => { this.setState({ isOpen: false , value: item }); this.props.onChange(item) }} className="item">
				<i className={"fas fa-" + item.icon}></i>&nbsp;&nbsp;&nbsp;
				{item.label}
			</div>
		)
	}
	render(){
		return (
			<div onClick={(ev) => { this.setState({ isOpen: !this.state.isOpen }); }} className={"nice-select" + ( this.state.isOpen ? " open": "")}>
				<div className="visible">{this.state.value ? <span><i className={"fas fa-" + this.state.value.icon}></i>&nbsp;&nbsp;&nbsp;{this.state.value.label}</span> : this.props.defaultText}</div>
				<div className="items">
					<div class="filter-items">
						<input onClick={(event) => { event.stopPropagation(); }} placeHolder="Filter" type="text"/>
					</div>
					{this.props.options.map((item) => this.getItem(item))}
				</div>
			</div>
		)
	}
}