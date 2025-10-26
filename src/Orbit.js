import { OrbitControls } from 'three/examples/jsm/Addons.js';

function Orbit(camera, renderer){
    const controls = new OrbitControls(camera, renderer.domElement);
    return controls
}

export default Orbit