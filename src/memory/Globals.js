export default class Globals {

	static OBJECTS = {

	}
	static store(key , value){
		Globals.OBJECTS[key] = value;
	}
	static retrieve(key){
		return Globals.OBJECTS[key];
	}

}