import './App.css';

import Altmenu from './view/ui/Altmenu';
import WebGLContainer from './view/panel/webgl';
import MeshHierarchy from './view/panel/meshhierarchy';
import MediaPane from './view/panel/mediapanel';
import PoseRecogPane from './view/panel/poserecognitionpane';
import MeshMapping from './view/panel/meshmapping';

import Mesh from './defaults/default.glb';


function App() {
  
  return (
    <div className="App">
    	<Altmenu />
    	<MeshHierarchy title={"Hierarchy"} style={{ position: "absolute" , top: 40 , left: 0 }} width={300} height={window.innerHeight - 610}/>
      	<WebGLContainer mesh={Mesh} style={{ position: "absolute" , top: 40 , left: 301 , overflow: "hidden"}} width={(window.innerWidth / 2) - 150} height={567} id="webglrenderer" />
      	<MediaPane title={"Media: Images/Videos"} style={{ position: "absolute" , bottom: 0 , left: 0}} width={300} height={567}/>
      	<PoseRecogPane title={"Pose Recognition"} style={{ position: "absolute" , top: 40 , right: 0 }} width={390} height={572}/>
      	<MeshMapping title={"Bone/Keypoint Mapping"} style={{ position: "absolute" , top: 40 , right: 391  }} width={381} height={570}/>
    </div>
  );
}

export default App;
