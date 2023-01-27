import Skeleton from './model/skeleton.d.ts';

/**
* @description - Added in TypeScript to prove competence in TypeScript
*/
export default class Projection {

	/**
	* @param {Object} keypoints - a key value array with the list of key points.
	*/
	private keypoints: object;

	/**
	* @param {THREE.Mesh} mesh - the mesh to apply the transformations to.
	*/
	private mesh: object;

	public constructor() {
		//do nothing.
	}
	/**
	* @param {THREE.Mesh} mesh - set the mesh
	* @return {Projection}
	*/
	public setMesh(mesh: object) : Projection {
		this.mesh = mesh;
		return this;
	}
	/**
	* @return {THREE.Mesh}
	*/
	public getMesh() : object{
		return this.mesh;
	}
	/**
	* @param {object} keypoints.
	* @return {Projection}
	*/
	public setKeypoints(keypoints: object) : Projection{
		this.keypoints = keypoints;
		return this;
	}
	//TODO: Build Estimation model to map 2d coordinates to 3d.
	public estimate() : Projection {
		let skel = new Skeleton();

		console.log(skel);

		return this;
	}
}