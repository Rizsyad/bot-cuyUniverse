const Levels = require("discord-xp");
const client = require("../index");
const { conn } = require("../database/db");

Levels.setURL(conn);

client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return;

    const Xpamout = Math.floor(Math.random() * 20) + 1;
    const userID = message.author.id;
    const guildID = message.guild.id;

    const LevelUp = await Levels.appendXp(message.author.id, message.guild.id, Xpamout);

    if (LevelUp) {
        const user = await Levels.fetch(userID, guildID);
        message.channel.send({
            content: `${message.author}, Selamat! level anda telah naik ke **${user.level}**. :tada: `,
        });
    }
});
