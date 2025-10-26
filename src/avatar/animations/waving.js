import { playAnimationSmoothly } from "../playAnimationSmoothly";

export function waving(avatar, mixer, cb = null) {   
    playAnimationSmoothly(avatar, mixer, avatar.userData.wavingClip, 1, false, cb);
}