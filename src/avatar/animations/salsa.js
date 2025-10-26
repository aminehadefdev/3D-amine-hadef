import { playAnimationSmoothly } from "../playAnimationSmoothly";

export function salsa(avatar, mixer, onFinished) {
    playAnimationSmoothly(avatar, mixer, avatar.userData.salsaClip, 1, false, onFinished);
}