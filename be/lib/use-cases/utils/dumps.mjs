import { generateImagesURL } from './imagesURLGeneration.mjs';

export function dumpUser(user) {
    const dump = {
        id         : user.id,
        email      : user.email,
        firstName  : user.firstName,
        secondName : user.secondName,
        avatarUrl  : user.avatar ? generateImagesURL(user.avatar) : '',
        lang       : user.lang,
        createdAt  : user.createdAt.toISOString(),
        updatedAt  : user.updatedAt.toISOString()
    };

    return dump;
}

export function dumpBots(bot) {
    return {
        id        : bot.id,
        hostId    : bot.hostId,
        createdAt : bot.createdAt.toISOString(),
        updatedAt : bot.updatedAt.toISOString()
    };
}

export function dumpAdmin(admin) {
    const dump = {
        id        : admin.id,
        email     : admin.email,
        createdAt : admin.createdAt.toISOString(),
        updatedAt : admin.updatedAt.toISOString()
    };

    return dump;
}
