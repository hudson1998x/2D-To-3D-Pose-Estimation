import BallJoint from './BallJoint';
import Vector3Range from './../../math/Vector3Range';

export default class ShoulderJoint extends BallJoint {

	public constructor(name:string , imageX:number , imageY:number){
		super(name , imageX , imageY);
		this.setJointType(BallJoint.BALLJOINT_SHOULDER);
	}
	/**
	* @type - Radian
	*/
	public getRotationalBounds() : Vector3Range {
		let range = new Vector3Range();

		range.x(this.degToRad(-90) , this.degToRad(180));
		range.y(this.degToRad(-5) , this.degToRad(20));
		range.z(this.degToRad(-30) , this.degToRad(90));

		return range;
	}
	private degToRad(deg:number){
		return (deg * (Math.PI / 180));
	}
}