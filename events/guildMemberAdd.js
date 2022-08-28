const client = require("../index");
const GuildStatsSchema = require('../database/schema/guildStatsSchema');

client.on("guildMemberAdd", (member) => {
    const TotalMembers = member.guild.memberCount;
    const Bot = member.guild.members.cache.filter((m) => m.user.bot).size;
    const Human = TotalMembers - Bot;
    const FindGuildStats = GuildStatsSchema.findOne({ guildID: member.guild.id}, (err, obj) => {
        const channel1Id = obj.channel1ID;
        const channel2Id = obj.channel2ID;
        const channel3Id = obj.channel3ID;

        console.log("Add")

        client.channels.cache.get(channel1Id).setName(`👥 | All Members : ${TotalMembers}`);
        client.channels.cache.get(channel2Id).setName(`👤 | Members : ${Human}`);
        client.channels.cache.get(channel3Id).setName(`🤖 | Bot : ${Bot}`);
    })

})