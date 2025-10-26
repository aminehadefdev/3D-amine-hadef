import * as THREE from 'three';

function Scene(color){
    const s = new THREE.Scene();
    s.background = new THREE.Color(color);
    return s
}


export default Scene