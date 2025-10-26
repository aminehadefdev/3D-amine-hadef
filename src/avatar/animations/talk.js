import { playAnimationSmoothly } from "../playAnimationSmoothly";

export function talk(avatar, mixer, cb = null) {
    playAnimationSmoothly(avatar, mixer, avatar.userData.talkClip, 1, false, cb);
}