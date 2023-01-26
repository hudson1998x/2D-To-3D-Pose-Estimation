import React from 'react';

import './style.css';

/**
* TODO: Implement this component
*/

export default class Altmenu extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="altmenu">
				<span className="logo">
					<span className="color-alt">&lt;</span>&nbsp;johnhudson&nbsp;<span className="color-alt">/&gt;</span>
				</span>
				<button className="git" onClick={ (ev) => { window.open('https://github.com/hudson1998x/2D-To-3D-Pose-Estimation' , 'about:blank;'); }}><i className="fab fa-github"></i></button>

				<span className="right-message">Version 1.1, Beta (Some functionality may not work)</span>
			</div>
		)
	}
}