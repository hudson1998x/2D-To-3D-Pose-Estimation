import PaneComponent from './../componentpane';


//POSENET AND TENSORFLOW
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as posenet from '@tensorflow-models/posenet';

//COMPONENTS
import Placeholder from './wait-placeholder';

//MODELS
import Skeleton from './../../../model/Skeleton.js';

//MEDIA
import spinner from './../../../media/spinner.gif';

/**
* this component loads posenet, and begins to start the pose estimation
* process. 
*/
export default class PoseRecognitionPane extends PaneComponent {

	static CANVASINSTANCE = null;
	static CANVASCONTEXT = null;
	static POSENET = null;

	constructor(props){
		super(props);
		this.state = {
			currentImage: null , 
			posenetReady: false
		}
		
		//bind methods.
		this.canvas = this.canvas.bind(this);
		this.canvascontext = this.canvascontext.bind(this);

		window.addEventListener('media-item-change' , ({detail}) => {
			console.log("Changing image to: " , detail.file);
			this.setState({
				currentImage: detail.file
			});
			let {file} = detail;
			if ( file.type.indexOf('image/') > -1 ) {
				let image = new Image();
				image.onload = () => {
					this.canvascontext().drawImage(image , 0 , 0);

					this.estimate();
				};
				image.src = file.preview;
			}
		});
		//CREATE A STATIC REFERENCE TO THE CANVAS
		//THE CANVAS WILL NEVER CHANGE, JUST HAVE
		//THE CONTENTS UPDATED
		if ( !PoseRecognitionPane.CANVASINSTANCE ) {
			PoseRecognitionPane.CANVASINSTANCE = document.createElement("canvas");
			PoseRecognitionPane.CANVASCONTEXT = this.canvas().getContext("2d");
		}
		//CREATES A STATIC INSTANCE TO POSENET, PREVENTS POOR USAGE
		//OF THE COMPONENT FROM AFFECTING PERFORMANCE
		if ( !PoseRecognitionPane.POSENET ) {

			posenet.load()
				   .then((net) => {
				   		PoseRecognitionPane.POSENET = net;
				   		try{
				   			setTimeout( () => {
				   				this.setState({
						   			posenetReady: true
						   		});
				   			} , 1000);
				   		}catch(e){
				   			this.state.posenetReady = true;
				   		}
				   })
				   .catch((err) => {
				   	   console.warn("Please note, While developing I experienced issues with TensorFlow & Posenet together, make sure you install tfjs-converter and backend-gpu using npm install 'PACKAGE_NAME' --force");
				   	   console.error(err);
				   });



			console.log(PoseRecognitionPane.POSENET);

		} else {

			this.state.posenetReady = true;

		}
	}
	estimate(){
		this.net()
			.estimateSinglePose(this.canvas() , 0.4 , false , 16)
			.then((data) => {
				const pose = data.keypoints;
				let ev = new CustomEvent('posenet-result' , {
					detail: {
						result: pose
					}
				});
				
				window.dispatchEvent(ev);
				let skel = new Skeleton();
				skel.setPose(pose);
				skel.setContext(this.canvascontext());

				skel.drawToCanvas();

				
				
			})
			.catch((err) => {
				console.error(err);
			});
	}
	net(){
		return PoseRecognitionPane.POSENET;
	}
	canvas(){
		return PoseRecognitionPane.CANVASINSTANCE;
	}
	canvascontext(){
		return PoseRecognitionPane.CANVASCONTEXT;
	}
	componentDidUpdate(){
		document.querySelector('#posenetrecog').appendChild(PoseRecognitionPane.CANVASINSTANCE);

		if ( this.state.currentImage ) {
			let container = this.canvas().parentNode;

			let { width , height } = container.getBoundingClientRect();

			this.canvas().width = width;
			this.canvas().height = height - 40;
		}
	}
	loading(){
		return (
			<img src={spinner} style={{position: "absolute" , top: "calc(50% - 20px)" , left: "calc(50% - 20px)" , width: "40px" , height: "40px"}} />
		)
	}
	canvasView(){
		if ( !this.state.currentImage ) {
			return (
				<Placeholder />
			)
		} else {
			return null;
		}
	}
	content(){
		return (
			<div id="posenetrecog" style={{height: '100%'}} Name="canvas-container">
				{!this.state.posenetReady && !this.state.currentImage ? this.loading() : this.canvasView()}
			</div>
		);
	}

}