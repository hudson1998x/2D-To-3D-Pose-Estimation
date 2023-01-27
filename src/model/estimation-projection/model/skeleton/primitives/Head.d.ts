import BodyPart from './../BodyPart.d.ts';
import Vector3Range from './../../math/Vector3Range.d.ts';

export default class Head extends BodyPart {
	public getRotationalBounds() : Vector3Range {
		let range = new Vector3Range();
		range.x(this.degToRad(-20) , this.degToRad(45));
		range.y(this.degToRad(-90) , this.degToRad(90));
		range.z(this.degToRad(-45) , this.degToRad(45));

		return range;
	}
	private degToRad(deg:number){
		return (deg * (Math.PI / 180));
	}
}