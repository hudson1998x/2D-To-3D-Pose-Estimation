import Vector3Range from './../math/Vector3Range';

/**
* @description - This class is for individual body parts.
*              - this will become a main part of the 
               - estimation of the 3d pose.
*/
export default abstract class BodyPart {
	private name:string = "";
	private imageX:number = 0;
	private imageY:number = 0;

	/**
	* @description maps to body part name from posenet estimation
	*/
	private bodyPartName:string="";

	private parent:null | BodyPart = null;	
	private children: Array<BodyPart> = [];

	public constructor(name:string , imageX:number , imageY:number) {
		this.name = name;
		this.imageX = imageX;
		this.imageY = imageY;
	}
	/**
	* @param {String} name - The body part name on the keypoints array.
	* @return {BodyPart} this
	*/
	public setBodyPartName(name:string) : BodyPart{
		this.name = name;
		return this;
	}
	/**
	* @param {BodyPart} parent - the parent part.
	* @return {BodyPart} this
	*/
	public setParent(parent:BodyPart) : BodyPart {
		this.parent = parent;
		return this;
	}
	/**
	* @return {null|BodyPart}
	*/
	public getParent() : null | BodyPart {
		return this.parent;
	}
	/**
	* @param {BodyPart} child - the child bodypart to add
	* @return {BodyPart} this
	*/
	public addChild(child:BodyPart) : BodyPart {
		child.setParent(this);
		this.children.push(child);
		return this;
	}
	/**
	* @return {Array<BodyPart>} list of child body parts
	*/
	public getChildren() : Array<BodyPart> {
		return this.children;
	}

	/**
	* @abstract
	* @description - get a {Vector3Range} for the max rotational bounds.
	*/
	public abstract getRotationalBounds() : Vector3Range;
}