import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

function Camera(renderer) {
    // Caméra
    const c = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    c.position.set(300, 300, 200);
    // if(renderer){
    //     const controls = new OrbitControls(c, renderer.domElement);
    // }

    return c;
}

export default Camera