import React from 'react';

import './style.css';

/**
* @description - this is a basic drag and drop file dropper. 
*              - when a file is dropped to this, the parent component
			   - passes a function that fires when a file(s) dropped
*/

export default class FileUploadPlaceholder extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isDragOver: false
		};
		this.dragOver = this.dragOver.bind(this);
		this.dragEnd = this.dragEnd.bind(this);
	}
	dragOver(ev){
		ev.preventDefault();
		ev.stopPropagation();
		this.setState({
			isDragOver: true
		});
	}
	dragEnd(ev){
		ev.nativeEvent.preventDefault();
		ev.nativeEvent.stopPropagation();

		if ( this.props.onFilesAdded ) {
			this.props.onFilesAdded(ev.dataTransfer.files);
		}

		this.setState({
			isDragOver: false
		});
	}
	render(){
		return (
			<div onDragOver={this.dragOver} onDrop={this.dragEnd} className={"file-dropper " + (this.state.isDragOver ? " active": "")}>
				<div className="icon">
					<i className="fas fa-image"></i>
				</div>
				<span>Drop Image/Video to begin</span>
			</div>
		);
	}
}