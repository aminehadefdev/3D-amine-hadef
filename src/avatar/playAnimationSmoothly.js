import { LoopRepeat, LoopOnce } from 'three';

export function playAnimationSmoothly(avatar, mixer, targetClip, fadeDuration = 0.6, shouldLoop = false, onFinished) {
    if (!avatar || !mixer || !targetClip) return;

    const currentAction = avatar.userData.currentAction || null;
    const nextAction = mixer.clipAction(targetClip);

    // Activer et configurer l'action cible
    nextAction.enabled = true;
    nextAction.reset();
    nextAction.setEffectiveWeight(1);
    nextAction.setEffectiveTimeScale(1);

    if (shouldLoop) {
        nextAction.setLoop(LoopRepeat, Infinity);
        nextAction.clampWhenFinished = false;
    } else {
        nextAction.setLoop(LoopOnce, 0);
        nextAction.clampWhenFinished = true; // on préfère false et gérer l'enchaînement
    }

    // Démarrer la nouvelle action (prépare pour le fade)
    nextAction.play();

    // Crossfade depuis l'action courante si elle existe
    if (currentAction && currentAction !== nextAction) {
        currentAction.crossFadeTo(nextAction, fadeDuration, false);
    }

    // 🔔 Ajouter le callback à la fin si l'animation ne boucle pas
    if (!shouldLoop && typeof onFinished === 'function') {
        const handleFinished = (e) => {
            if (e.action === nextAction) {
                mixer.removeEventListener('finished', handleFinished);
                onFinished();
            }
        };
        mixer.addEventListener('finished', handleFinished);
    }

    // Sauvegarder la nouvelle action
    avatar.userData.currentAction = nextAction;
}
