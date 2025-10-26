import { Clock } from 'three';
import Scene from './scene';
import Camera from './camera';
import Renderer from './Renderer';
import Controls from './Controls'
import Light from './light';

import { loadAvatar } from "./avatar/loadAvatar";
import { loadRoom } from './room/loadRoom';
import { clickAvatar } from './avatar/clickAvatar';

import { displaydialog } from './avatar/displaydialog';
import { displayTextOnDialog } from './avatar/displayTextOnDialog';
import { stay } from './avatar/animations/stay';
import { waving } from './avatar/animations/waving';


// --- Variables globales ---
let avatar, mixer, room;
// --- Horloge ---
const clock = new Clock();
// --- Scène ---
const scene = Scene(0xdddddd)
// --- Rendu ---
const renderer = Renderer()
// --- Caméra ---
const camera = Camera(renderer)
// --- Contrôles ---
const controls = Controls(camera, renderer)
// --- Lumières ---
Light(scene)


// --- Charger l'avatar ---
const avatarAnimations = [
  '../public/objs/animations/stay.glb',
  '../public/objs/animations/talkin001.glb',
  '../public/objs/animations/salsa.glb',
  '../public/objs/animations/waving.glb'
]
loadAvatar(scene, '../public/objs/avatar/rpm.glb', avatarAnimations).then((data) => {
  avatar = data.avatar;
  mixer = data.mixer;
  displaydialog(() => {
    displayTextOnDialog("Clickez sur l'avatar pour avoir un dialog.", () => {})
  })
  clickAvatar(avatar, camera, controls, renderer, scene, mixer);
});

// --- Charger la room ---
loadRoom(scene, '../public/objs/room/room3.glb').then((data) => {
  room = data.room;
});


// --- Animation principale ---


function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  if (mixer) mixer.update(delta);

  controls.update();
  renderer.render(scene, camera);
}

animate();

// --- Redimensionnement ---
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
