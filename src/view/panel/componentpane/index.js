import UtilityPane from './../UtilityPane.js';

export default class ComponentPane extends UtilityPane {

	render(){
		return (
			<div className="pane" id={this.props.id} style={{width: this.props.width , height: this.props.height , ...this.props.style}}>
				<div className="pane-title">{this.props.title}</div>
				<div className="pane-content">
					{this.content()}
				</div>
			</div>
		)
	}

}