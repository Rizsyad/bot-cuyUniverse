const { MessageEmbed } = require("discord.js");
const client = require("../index");
const ms = require("ms");

const { COLORS_EMBEED } = client.config;

const embeed = (embeedJson) => {
    const { title, author, thumbnail, description, image, fields, color, footer } = embeedJson;

    const makeEmbeed = new MessageEmbed();

    if (author) makeEmbeed.setAuthor(author.name, author.image);
    if (title) makeEmbeed.setTitle(title);
    if (thumbnail) makeEmbeed.setThumbnail(thumbnail);
    if (description) makeEmbeed.setDescription(description);
    if (image) makeEmbeed.setImage(image);
    if (fields) makeEmbeed.setFields(...fields);

    if (footer) makeEmbeed.setFooter(footer.name || client.user.username, footer.image || "");
    if (!footer) makeEmbeed.setFooter(client.user.username, client.user.displayAvatarURL());

    if (color) makeEmbeed.setColor(color);
    if (!color) makeEmbeed.setColor(COLORS_EMBEED);

    makeEmbeed.setTimestamp();

    return makeEmbeed;
};

const errorEmbed = (text) => {
    const makeEmbeed = embeed({
        title: "Error",
        description: text,
        color: "RED",
    });
    return makeEmbeed;
};

const successEmbed = (text) => {
    const makeEmbeed = embeed({
        title: "Success",
        description: text,
        color: "GREEN"
    });
    return makeEmbeed;
}

const modActionEmbeed = (action, usertag, userid, modid, reason, duration) => {
    const makeEmbeed = embeed({
        title: `[${action}] ${usertag}`,
        fields: [
            { name: "User", value: `<@${userid}>`, inline: true },
            {
                name: "Moderator",
                value: `<@${modid}>`,
                inline: true,
            },
            { name: "Reason", value: reason, inline: true },
            {
                name: "Duration",
                value: `${ms(duration, { long: true })}`,
                inline: true,
            },
        ],
        color: "RED",
    });

    return makeEmbeed;
};

module.exports = {
    embeed,
    errorEmbed,
    modActionEmbeed,
    successEmbed,
};
