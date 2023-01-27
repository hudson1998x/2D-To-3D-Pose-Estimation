import ComponentPane from './../componentpane';

import './style.css';

export default class MeshHierarchy extends ComponentPane {
	constructor(props){
		super(props);
		this.state = {
			loaded: false
		}
		window.addEventListener('mesh-changed' , ({ detail }) => {
			let { mesh } = detail;
			let assign = {
				mesh: mesh , 
				loaded: false
			};

			if ( !this.state.loaded ) {
				this.state = assign;
			} else {
				this.setState(assign);
			}
		});
	}
	componentDidMount(){
		this.state.loaded = true;
	}
	getIcon(mesh){
		switch(mesh.type){
			case "SkinnedMesh":
				return (<i className="fas fa-cube"></i>);
			break;
			case "Bone":
				return (<i className="fas fa-bone"></i>);
			break;
		}
	}
	buildHierarchy(mesh){
		if ( !mesh ) {
			return;
		}
		return (
			<div className="item">
				<div className="label">
					{this.getIcon(mesh)}&nbsp;&nbsp;&nbsp;
					{mesh.name}
				</div>
				{
					mesh.children && mesh.children.length > 0 ? 
					<div className="children">{mesh.children.map((item) => this.buildHierarchy(item))}</div> :
					<div></div>
				}
			</div>
		)
	}
	content(){
		return (
			<div className="hierarchy">
				<div className="filter">
					<input type="text" placeholder="Filter Objects"/>
				</div>
				<div className="inner-hierarchy">
					<div className="hide-scroll">
						{this.buildHierarchy(this.state.mesh)}
					</div>
				</div>
			</div>
		)
	}
}