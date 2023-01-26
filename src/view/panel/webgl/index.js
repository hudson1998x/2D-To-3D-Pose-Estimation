import React from 'react';
import { 
	WebGLRenderer , 
	PerspectiveCamera , 
	Scene , 
	Color , 
	GridHelper , 
	Vector3 , 
	AmbientLight , 
	MeshNormalMaterial
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import UtilityPane from './../UtilityPane.js';

import style from './style.css';

/**
* @description - This component is for the WebGL functionality
*              - this will use THREEJS
*/

export default class WebGLContainer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			width: props.width ? props.width : (window.innerWidth / 2) , //defaults to half the screen width
			height: props.height ? props.height : (window.innerHeight - 200) ,  //leaves room for other components. , 
			framesPerSecond: 0
		}
		this.updateGl = this.updateGl.bind(this);
	}

	/**
	* @description - called every frame update by requestAnimationFrame.
	*/
	updateGl(){
		if ( this.state.renderer ) {
			let { controls , renderer , camera , scene } = this.state;

			controls.update();
			renderer.render( scene , camera );

		} else {
			console.log("Not rendering");
		}
		//if it doesn't exist, this is a NOOP.
	}

	/**
	* @description - Create a WebGL Context, a PerspectiveCamera and a Scene Object
	               - then add it into the DOM
	*/
	componentDidMount(){
		//first we create the webgl context
		let renderer = new WebGLRenderer({
			antialias: true , 
			alpha: true
		});
		//set the background color to black.
		renderer.setClearColor(new Color(0x000000) , 1);

		//then we create a scene,
		//this holds all your 3D objects
		let scene = new Scene();

		//Now a PerspectiveCamera
		// 80 = FOV
		// innerWidth / innerHeight = Aspect Ratio
		// 0.01 = Near Clipping
		// 1000 = Far Clipping
		let camera = new PerspectiveCamera(80 , window.innerWidth / window.innerHeight , 0.01 , 1000);


		//Add the camera to the scene
		scene.add(camera);

		//set the camera position away from 0,0,0
		camera.position.set( 0 , 6 , 4);

		//get the camera to point towards the center of the world

		//create a controls function, this allows movement and rotation
		//of the viewport
		let controls = new OrbitControls(camera , renderer.domElement);

		//React prevents propagation of native events when using
		//THREE, this will force the webgl instance to render
		//when you move your 3D position/rotation
		controls.addEventListener( 'change', ()=>{renderer.render(scene, camera)} );
		
		//set the controls enabled
		controls.enabled = true;


		//force an update.
		controls.update();

		//pass these values to the state
		this.setState({
			renderer: renderer , 
			scene: scene , 
			camera: camera , 
			controls: controls
		});

		//lets track FPS (For performance)
		//High poly meshes will reduce performance.

		let fpsCounter = 0;

		//create the animation loop function.
		//this will fire every time the next
		//rendering frame is ready
		let anim = () => {
			this.updateGl();
			requestAnimationFrame(anim);
			fpsCounter++;
		};
		
		//start the render cycle
		anim();

		//every second reset the FPS counter and display the fps.
		setInterval( () => {
			this.setState({
				framesPerSecond: fpsCounter
			});
			fpsCounter = 0;
		} , 1000 );

		//if the canvas from renderer.domElement isn't a part of 
		//the dom, append it to the webgl pane
		if ( !document.querySelector('#' + this.props.id + ' canvas') ) {
			//we want to see the FPS
			this.fpsCounter = document.createElement("div");
			this.fpsCounter.className = 'fpsCounter';

			//append fpsCounter and canvas to the pane
			document.querySelector('#' + this.props.id + ' .pane-content').appendChild(this.fpsCounter);
			document.querySelector('#' + this.props.id + ' .pane-content').appendChild(renderer.domElement);
		}

		//grab the width from the state.
		let { width , height } = this.state;

		//create and add a grid
		let grid = new GridHelper(10 , 10 , 0xA11818);
		scene.add(grid);

		//pass the size to the renderer
		renderer.setSize(width , height);

		//for anything listening to the state
		this.setState({
			webglInitialised: true
		});

		//now we need to add lighting
		let light = new AmbientLight(0xFFFFFF);
		light.intensity = 3;
		light.position.set(0 , 1 , 10);
		scene.add(light);

		//force initial render
		renderer.render(scene , camera);

		if ( this.props.mesh ) {
			let loader = new GLTFLoader();
			loader.load(
				this.props.mesh , 
				//onLoad
				(gltf) => {
					//add the whole scene to the existing one
					scene.add(gltf.scene);

					// we didnt try grabbing the mesh first as its
					// generated as its requested (i.e by adding to scene)
					let skinnedMesh = gltf.scene.children[0].children[0];


					//if the mesh is a MeshStandardMaterial, convert to MeshNormalMaterial
					if ( skinnedMesh.material.type == 'MeshStandardMaterial' ) {

						skinnedMesh.material = new MeshNormalMaterial();
						skinnedMesh.material.needsUpdate = true;

					}

					//the mesh has changed, dispatch a global
					//event, so plugins can listen.
					let ev = new CustomEvent('mesh-changed' , {
						detail: {
							mesh: skinnedMesh.parent
						}
					});
					window.dispatchEvent(ev);

					//rerender scene
					renderer.render(scene , camera);
					controls.update();
				}
			);
		}

	}
	/**
	* @description - componentDidUpdate will be fired if 
	               - the panels width/height is modified. 
	*/
	componentDidUpdate(){

		this.state.renderer.render(this.state.scene , this.state.camera);
		let { width , height , scene } = this.state;
		scene.background = new Color(0x000000);
		this.state.renderer.setSize(width , height);

		if ( this.fpsCounter ) {
			this.fpsCounter.textContent = this.state.framesPerSecond;
		}
	}
	render(){
		
		if ( !this.state && !this.state.renderer && !this.state.renderer.domElement ) {
			//if the webgl instance isn't ready
			//show an empty pane while it loads
			return (
				<div className="pane">

				</div>
			);
		}

		return (
			<UtilityPane style={this.props.style} title="3D Viewport" width={ this.state.width } height={ this.state.height } id={this.props.id}/>
		)
	}
}