import * as THREE from 'three';

export function moveCameraToTopView(avatar, camera, controls, renderer, scene, cb) {
    if (!avatar) return;

    const heightOffset = 300; // hauteur au-dessus de l'avatar

    const targetPos = new THREE.Vector3(
        avatar.position.x + 100,
        avatar.position.y + heightOffset,
        avatar.position.z + 150
    );

    const headPos = avatar.position.clone(); // la caméra regarde le centre de l'avatar

    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    const duration = 1.5;
    const startTime = performance.now();

    function animateFocus(now) {
        const elapsed = (now - startTime) / 1000;
        const t = Math.min(elapsed / duration, 1);

        // Interpolation linéaire
        camera.position.lerpVectors(startPos, targetPos, t);
        controls.target.lerpVectors(startTarget, headPos, t);

        controls.update();
        renderer.render(scene, camera);

        if (t < 1) {
            requestAnimationFrame(animateFocus);
        } else if (cb) {
            cb();
        }
    }

    requestAnimationFrame(animateFocus);
}
