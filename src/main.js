import { Clock } from 'three';
import Scene from './Scene';
import Camera from './Camera';
import Renderer from './Renderer';
import Controls from './Controls'
import Light from './Light';

import { loadAvatar } from "./avatar/loadAvatar";
import { loadRoom } from './room/loadRoom';
import { clickAvatar } from './avatar/clickAvatar';

import { displaydialog } from './avatar/displaydialog';
import { displayTextOnDialog } from './avatar/displayTextOnDialog';
import "../dist/objs/animations"

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
  '../dist/objs/animations/stay.glb',
  '../dist/objs/animations/talkin001.glb',
  '../dist/objs/animations/salsa.glb',
  '../dist/objs/animations/waving.glb'
]
loadAvatar(scene, '../dist/objs/avatar/rpm.glb', avatarAnimations).then((data) => {
  avatar = data.avatar;
  mixer = data.mixer;
  displaydialog(() => {
    displayTextOnDialog("Clickez sur l'avatar pour avoir un dialog.", () => {})
  })
  clickAvatar(avatar, camera, controls, renderer, scene, mixer);
});

// --- Charger la room ---
loadRoom(scene, '../dist/objs/avatar/room3.glb').then((data) => {
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
