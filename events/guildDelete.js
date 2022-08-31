const Levels = require("discord-xp");
const client = require("../index");

client.on("guildDelete", async (guild) => {
    const deleteGuildUserLevel = Levels.deleteGuild(guild.id);
});
