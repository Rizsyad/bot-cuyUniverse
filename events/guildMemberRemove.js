const Levels = require("discord-xp");
const client = require("../index");

client.on("guildMemberRemove", async (member) => {
    const deleteUserLevel = Levels.deleteUser(member.user.id, member.guild.id);
});
