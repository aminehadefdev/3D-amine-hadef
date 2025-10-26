import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


function Controls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    return controls;
}

export default Controls;