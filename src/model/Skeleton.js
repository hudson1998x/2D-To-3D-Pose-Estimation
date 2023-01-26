import Estimation from './estimation-projection/index.d.ts';

import Memory from './../memory/Globals.js';
/**
* @description - This class handles all the information
*              - about the estimated pose.
*/
export default class Skeleton {
	constructor(){
		this.context = null;
		this.pose = null;
	}
	/**
	* @param ctxt {HTMLCanvasContext} - the 2d context
	* @return {Skeleton}
	*/
	setContext(ctxt){
		this.context = ctxt;
		return this;
	}
	/**
	* @param pose {ObjectArray}
	* @return {Skeleton} 
	*/
	setPose(pose){
		this.pose = pose;
		this.pose[17] = {
			score: 1 , 
			part: 'centerChest' , 
			position: {
				x: this._middle(this.getPosePoint('leftShoulder').position.x , this.getPosePoint('rightShoulder').position.x) , 
				y: this._middle(this.getPosePoint('leftShoulder').position.y , this.getPosePoint('rightShoulder').position.y)  
			}
		};
		this.pose[18] = {
			score: 1 , 
			part: 'centerWaist' , 
			position: {
				x: this._middle(this.getPosePoint('leftHip').position.x , this.getPosePoint('rightHip').position.x) , 
				y: this._middle(this.getPosePoint('leftHip').position.y , this.getPosePoint('rightHip').position.y) 
			}
		};
		this.pose.length = 19;
		return this;
	}
	_middle(val1 , val2){
		//val1 = 120, val2 = 80
		if ( val1 > val2 ) {
			//value = 120 - 80 = 40 / 2 = 20
			let value = (val1 - val2) / 2;
			//120 - 20 = 100
			return val1 - value;
		} else {
			//val2 = 120
			//val1 = 80
			//value = 120 - 80 / 2 = 20
			let value = (val2 - val1) / 2;
			//120 - 20 = 100
			return val2 - value;
		}

	}
	drawToCanvas(){
		let skel = {
			nose: ["leftEye" , "rightEye" , "centerChest"] , 
			leftEye: ["leftEar"] , 
			rightEye: ["rightEar"] , 
			centerChest: ["leftShoulder" , "rightShoulder" , "centerWaist"] , 
			leftShoulder: ["leftElbow"] , 
			leftElbow: ["leftWrist"] , 
			rightShoulder: ["rightElbow"] , 
			rightElbow: ["rightWrist"] , 
			centerWaist: ["leftHip" , "rightHip"] , 
			leftHip: ["leftKnee"] , 
			leftKnee: ["leftAnkle"] , 
			rightHip: ["rightKnee"] , 
			rightAnkle: ["rightAnkle"]
		};

		for(let partName in skel){
			let targets = skel[partName];
			let self = this.getPosePoint(partName);

			targets.forEach((target) => {
				let bone = this.getPosePoint(target);
				this.context.beginPath();
				this.context.moveTo(self.position.x , self.position.y);
				this.context.lineTo(bone.position.x , bone.position.y);
				this.context.strokeStyle = 'yellow';
				this.context.lineWidth = 2;
				this.context.stroke();
			});
		}
	}
	estimate(){
		let estimator = new Estimation();
		estimator.setKeypoints(this.pose);
		estimator.setMesh(Memory.retrieve('current-mesh'));

		estimator.estimate();
	}
	getPosePoint(keyName){
		for(let i = 0;i < this.pose.length;i++){
			if ( this.pose[i].part.toLowerCase().indexOf(keyName.toLowerCase()) > -1 ) {
				return this.pose[i];
			}
		}
	}
}