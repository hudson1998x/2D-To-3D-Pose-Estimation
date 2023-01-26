import './App.css';

import Altmenu from './view/ui/Altmenu';
import WebGLContainer from './view/panel/webgl';
import MeshHierarchy from './view/panel/meshhierarchy';
import MediaPane from './view/panel/mediapanel';
import PoseRecogPane from './view/panel/poserecognitionpane';

import Mesh from './defaults/default.glb';

function App() {
  
  return (
    <div className="App">
    	<Altmenu />
    	<MeshHierarchy title={"Hierarchy"} style={{ position: "absolute" , top: 40 , left: 0 }} width={300} height={window.innerHeight - 610}/>
      	<WebGLContainer mesh={Mesh} style={{ position: "absolute" , top: 40 , left: 301 }} width={window.innerWidth / 2} height={window.innerHeight - 450} id="webglrenderer" />
      	<MediaPane title={"Media: Images/Videos"} style={{ position: "absolute" , bottom: 0 , left: 0}} width={300} height={567}/>
      	<PoseRecogPane title={"Pose Recognition"} style={{ position: "absolute" , top: 40 , right: 0 }} width={(window.innerWidth / 2) - 304} height={572}/>
    </div>
  );
}

export default App;
