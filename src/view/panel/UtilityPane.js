import React from 'react';

import './UtilityPane.css';

export default class UtilityPane extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		
		const Content = this.props.Content;

		if ( !Content ) {
			return (
				<div className="pane" id={this.props.id} style={{width: this.props.width , height: this.props.height , ...this.props.style}}>
					<div className="pane-title">
						{this.props.title}
					</div>
					<div className="pane-content">
						
					</div>
				</div>
			);
		} else {

			return (
				<div className="pane" id={this.props.id} style={{width: this.props.width , height: this.props.height , ...this.props}}>
					<div className="pane-title">
						{this.props.title}
					</div>
					<div className="pane-content">
						<Content {...this.props} {...this.state}/>
					</div>
				</div>
			);
		}
	}
}