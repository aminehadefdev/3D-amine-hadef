import { AnimationMixer, LoopRepeat } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { stay } from './animations/stay';
import { waving } from './animations/waving';

export function loadAvatar(scene, file, paths) {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      file,
      (gltf) => {
        const avatar = gltf.scene;

        avatar.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        avatar.scale.set(75, 75, 75);
        avatar.position.set(100, 15, 0);
        avatar.rotation.y = 0.09;
        scene.add(avatar);

        // --- Mixer ---
        const mixer = new AnimationMixer(avatar);

        // Si le modèle contient une animation intégrée
        if (gltf.animations.length > 0) {
          const action = mixer.clipAction(gltf.animations[0]);
          action.enabled = true;
          action.setEffectiveWeight(1);
          action.play();
        }

        // Charger les animations supplémentaires (stay, talk, salsa)
        const animLoader = new GLTFLoader();
        const loadAnim = (path) =>
          new Promise((resolveAnim, rejectAnim) => {
            if (!path) return resolveAnim(null);
            animLoader.load(path, (animGltf) => resolveAnim(animGltf.animations[0]), undefined, rejectAnim);
          });

        Promise.all(paths.map(loadAnim)).then(([stayClip, talkClip, salsaClip, wavingClip]) => {
          avatar.userData.stayClip = stayClip;
          avatar.userData.talkClip = talkClip;
          avatar.userData.salsaClip = salsaClip;
          avatar.userData.wavingClip = wavingClip;

          if (stayClip && wavingClip) {
            waving(avatar, mixer, () => {
              stay(avatar, mixer)
            })
          }

          resolve({ avatar, mixer });
        }).catch(err => reject(err));
      },
      undefined,
      (error) => reject(error)
    );
  });
}
