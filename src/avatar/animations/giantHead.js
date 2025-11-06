export const giantHead = (avatar, max = 2, step = 0.1) => {
    let head = avatar.getObjectByName('Head')
    if(head.scale.x < max && head.scale.z < max && head.scale.z < max ){
        head.scale.x += step
        head.scale.y += step
        head.scale.z += step
    }
}