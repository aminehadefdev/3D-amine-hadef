import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadRoom(scene, file, paths = []) {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      file,
      (gltf) => {
        const room = gltf.scene;

        // Configuration des meshes
        room.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        room.scale.set(1, 1, 1);
        scene.add(room);

        // --- Mixer pour les animations ---
        let mixer = null;

        if (gltf.animations && gltf.animations.length > 0) {
          console.log('🎬 Animations trouvées dans la room :', gltf.animations.map(a => a.name));
          mixer = new THREE.AnimationMixer(room);
          const action = mixer.clipAction(gltf.animations[0]);
          //action.play();
        } else {
          console.warn('⚠️ Aucune animation trouvée dans', file);
        }

        // Charger éventuellement des animations supplémentaires
        if (paths.length > 0) {
          const animLoader = new GLTFLoader();

          const loadAnim = (path) =>
            new Promise((resolveAnim) => {
              animLoader.load(path, (animGltf) => resolveAnim(animGltf.animations[0]));
            });

          Promise.all(paths.map(loadAnim)).then((clips) => {
            room.userData.extraClips = clips;
            resolve({ room, mixer });
          });
        } else {
          // Pas d’animations supplémentaires à charger
          resolve({ room, mixer });
        }
      },
      undefined,
      (error) => reject(error)
    );
  });
}
