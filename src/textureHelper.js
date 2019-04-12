function readTags(json) {
    let index = 0;
    let animTags = [];
    json.meta.frameTags.forEach(frameTag => {
        if (frameTag.from >= index) {
            animTags.push(Object.assign({}, frameTag, { animTags: [] }));
            index = frameTag.to;
        }
        else {
            animTags.find(animTag => animTag.from <= frameTag.from && animTag.to >= frameTag.to).animTags.push(frameTag);
        }
    });
    return animTags;
};

function readFps(animTags, json) {
    animTags.forEach(animTag => {
        const currentAnimTags = animTag.animTags.length ? animTag.animTags : [animTag];
        currentAnimTags.forEach(currentAnimTag => {
            currentAnimTag.frameRate = Math.round(1000 / json.frames[`textures ${currentAnimTag.from}.aseprite`].duration);
        });
    });
}

function readDimensions(animTags, json) {
    animTags.forEach(animTag => {
        animTag.width = json.frames[`textures ${animTag.from}.aseprite`].sourceSize.w;
        animTag.height = json.frames[`textures ${animTag.from}.aseprite`].sourceSize.h;
    });
}

function createdNestedNames(animTags) {
    animTags.forEach(animTags => {
        const prefix = animTags.animTags.length ? animTags.name + '.' : '';
        const currentAnimTags = animTags.animTags.length ? animTags.animTags : [animTags];
        currentAnimTags.forEach(currentAnimTags => {
            currentAnimTags.name = prefix + currentAnimTags.name;
            currentAnimTags.parent = animTags.name;
        });
    })
}

function readJson(json) {
    const animTags = readTags(json);
    readFps(animTags, json);
    readDimensions(animTags, json);
    createdNestedNames(animTags);
    return animTags;
}

function loadSheets(anims, sheet, preloader) {
    anims.forEach(anim =>
        preloader.load.spritesheet(anim.name, sheet, {
            frameWidth: anim.width,
            frameHeight: anim.height,
            startFrame: anim.from,
            endFrame: anim.to
        }));
}

function createAnims(animTags, creator) {
    const anims = {}
    animTags.forEach(animTag => {
        const currentAnimTags = animTag.animTags.length ? animTag.animTags : [animTag];
        currentAnimTags.forEach(currentAnimTag => 
            anims[currentAnimTag.name] = creator.anims.create({
                key: currentAnimTag.name,
                frames: creator.anims.generateFrameNumbers(currentAnimTag.parent, { start: currentAnimTag.from, end: currentAnimTag.to }),
                frameRate: currentAnimTag.frameRate,
                repeat: -1
            }));
    });
    return anims;
}

export default { readJson, loadSheets, createAnims };