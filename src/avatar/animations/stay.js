import { playAnimationSmoothly } from "../playAnimationSmoothly";

export function stay(avatar, mixer, cb = null) {
        playAnimationSmoothly(avatar, mixer, avatar.userData.stayClip, 1, true, cb);
}