import BallJoint from './BallJoint';
import Vector3Range from './../../math/Vector3Range';

export default class HipJoint extends BallJoint {

	public constructor(name:string , imageX:number , imageY:number){
		super(name , imageX , imageY);
		this.setJointType(BallJoint.BALLJOINT_HIP);
	}
	/**
	* @type - Radian
	*/
	public getRotationalBounds() : Vector3Range {
		let range = new Vector3Range();

		range.x(this.degToRad(-45) , this.degToRad(45));
		range.y(this.degToRad(-80) , this.degToRad(90));
		range.z(this.degToRad(-10) , this.degToRad(10));

		return range;
	}
	private degToRad(deg:number){
		return (deg * (Math.PI / 180));
	}
}