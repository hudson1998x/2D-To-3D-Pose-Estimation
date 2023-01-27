
export default class Vector3Range{
	
	/**
	* @param {number} rangeXMin - minimum X value
	*/
	private rangeXMin:number = 0;

	/**
	* @param {number} rangeXMax - maximum X value
	*/
	private rangeXMax:number = 0;

	/**
	* @param {number} rangeYMin - minimum Y value
	*/
	private rangeYMin:number = 0;

	/**
	* @param {number} rangeYMax - maximum Y value
	*/
	private rangeYMax:number = 0;

	/**
	* @param {number} rangeZMin - minimum Z value
	*/
	private rangeZMin:number = 0;

	/**
	* @param {number} rangeZMax - maximum Z value
	*/
	private rangeZMax:number = 0;

	/**
	* @type Radian
	* @param {number} min - minimum X value
	* @param {number} max - maximum X value
	*/
	public x(min:number , max:number) : Vector3Range{
		this.rangeXMin = min;
		this.rangeXMax = max;
		return this;
	}
	/**
	* @type Radian
	* @param {number} min - minimum Y value
	* @param {number} max - maximum Y value
	*/
	public y(min:number , max:number) : Vector3Range{
		this.rangeYMin = min;
		this.rangeYMax = max;
		return this;
	}
	/**
	* @type Radian
	* @param {number} min - minimum Z value
	* @param {number} max - maximum Z value
	*/
	public z(min:number , max:number) : Vector3Range{
		this.rangeZMin = min;
		this.rangeZMax = max;
		return this;
	}
	/**
	* @description - check whether a float is within the bounds of range
	* @param {number} check - the value to check
	*/
	public withinX(check:number) : Boolean {
		return (this.rangeXMin <= check && this.rangeXMax >= check );
	}
	/**
	* @description - check whether a float is within the bounds of range
	* @param {number} check - the value to check
	*/
	public withinY(check:number) : Boolean {
		return (this.rangeYMin <= check && this.rangeYMax >= check );
	}
	/**
	* @description - check whether a float is within the bounds of range
	* @param {number} check - the value to check
	*/
	public withinZ(check:number) : Boolean {
		return (this.rangeZMin <= check && this.rangeZMax >= check );
	}
	/**
	* @description - check whether a vector is within bounds
	* @param {number} x - the X value to check
	* @param {number} y - the Y value to check
	* @param {number} z - the Z value to check
	*/
	public withinBounds(x:number , y:number, z:number) : Boolean{
		return (
			this.withinX(x) &&
			this.withinY(y) &&
			this.withinZ(z)
		);
	}
}