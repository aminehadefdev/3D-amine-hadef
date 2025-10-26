import * as THREE from 'three';

export function focusAvatar(avatar, camera, controls, renderer, scene, cb) {
        if (!avatar) return;

        const headPos = avatar.position.clone();
        headPos.y += 125; // hauteur de la tête approximative

        const radius = 40;
        const angle = Math.PI / 2; // 45°
        const cameraX = avatar.position.x + Math.cos(angle) * radius;
        const cameraZ = avatar.position.z + Math.sin(angle) * radius;
        const cameraY = avatar.position.y + 125;

        const targetPos = new THREE.Vector3(cameraX, cameraY, cameraZ);
        const startPos = camera.position.clone();
        const startTarget = controls.target.clone();
        const duration = 1.5;
        const startTime = performance.now();

        function animateFocus(now) {
            const elapsed = (now - startTime) / 1000;
            const t = Math.min(elapsed / duration, 1);

            camera.position.lerpVectors(startPos, targetPos, t);
            controls.target.lerpVectors(startTarget, headPos, t);
            controls.update();
            renderer.render(scene, camera);

            if (t < 1) {
                requestAnimationFrame(animateFocus);
            } else {
                cb(); // Quand le mouvement de la camera est fini
            }
        }

        requestAnimationFrame(animateFocus);
    }