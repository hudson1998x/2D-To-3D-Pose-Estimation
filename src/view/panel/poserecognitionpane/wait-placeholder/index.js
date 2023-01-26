import React from 'react';

import './style.css';

export default class Placeholder extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="placeholder">
				<div className="icon">
					<i className="fas fa-image"></i>
				</div>
				<span>Choose Image/Video to begin</span>
			</div>
		)
	}
}