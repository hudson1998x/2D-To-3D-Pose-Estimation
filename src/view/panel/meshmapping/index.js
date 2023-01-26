import Pane from './../componentpane';
import Wait from './../poserecognitionpane/wait-placeholder';
import NiceSelect from './../../ui/nice-select';

import Memory from './../../../memory/Globals.js';

import './style.css';

export default class MeshMapping extends Pane {

	constructor(props){
		super(props);
		this.state = {
			mesh: Memory.retrieve('current-mesh') , 
			binds: {}
		};
		this.createBonesUI = this.createBonesUI.bind(this);
		this.convertTo2D = this.convertTo2D.bind(this);
		this.getBonesAsOptions = this.getBonesAsOptions.bind(this);


	}
	componentDidMount(){
		window.addEventListener('posenet-result' , ({detail}) => {
			let { result } = detail;

			this.setState({
				keypoints: result
			});
		});
	}
	toIterable(obj){
		let out = [];
		for(let i = 0;i < obj.length;i++){
			out.push(obj[i]);
		}
		return out;
	}
	getBonesAsOptions(){
		if ( !Memory.retrieve('current-mesh') ) {
			console.log("No Mesh");
			return [];
		} else {
			console.log("Building array");
			let children = this.convertTo2D(Memory.retrieve('current-mesh'));
			let out = [];

			children.forEach((child) => {
				out.push({
					label: child.name , 
					value: child.name , 
					icon: "bone"
				});
			})
			return out;
		}
	}
	convertTo2D(parent){
		let out = [];

		if ( !parent || !parent.children) {
			console.log(parent);
			return out;
		}

		parent.children.forEach((child) => {
			out.push(child);
			if ( child.children.length > 0 ) {
				let depth = this.convertTo2D(child);
				depth.forEach((item) => out.push(item));
			}
		});
		console.log(out);
		return out;
	}
	tableRow(point){
		return (
			<tr>
				<td>{point.part}</td>
				<td>
					<NiceSelect defaultText={(<span><i className="fas fa-bone"></i>&nbsp;&nbsp;&nbsp;None</span>)} options={this.getBonesAsOptions()} onChange={(boneName) => { this.state.bones[boneName] = point.part; }} />
				</td>
			</tr>
		)
	}
	createBonesUI(){
		return (
			<tbody>
				{this.toIterable(this.state.keypoints).map((point) => { return this.tableRow(point) })}
			</tbody>
		);
	}
	content(){
		if ( !this.state.keypoints ) {
			return (
				<Wait />
			);
		}
		return (
			<div>
				<table className="bones-mapping">
					<thead>
						<tr>
							<td>Keypoint</td>
							<td>Bone</td>
						</tr>
					</thead>
					{this.createBonesUI()}
					
				</table>
				<div style={{ height: "140px" }}></div>
			</div>
		)
	}

}