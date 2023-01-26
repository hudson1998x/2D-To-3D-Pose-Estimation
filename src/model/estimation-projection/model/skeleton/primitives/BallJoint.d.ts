import BodyPart from './../BodyPart';
import Vector3Range from './../../math/Vector3Range';

export default class BallJoint extends BodyPart {
	private facing:null | number = null;

	public static BALLJOINT_KNEE:number = 1;
	public static BALLJOINT_ELBOW:number = 2;
	public static BALLJOINT_SHOULDER:number = 3;
	public static BALLJOINT_WRIST:number = 4;
	public static BALLJOIN_ANKLE:number = 5;

	public getRotationalBounds() : Vector3Range {

	}
}