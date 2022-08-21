const { MessageEmbed, Guild, Interaction } = require("discord.js");
const { COLORS_EMBEED } = require("../../config");

module.exports = {
    name: "counter",
    aliases: ["c"],
    category: "general",
    description: "Show server members",
    run: async (client, message, args) => {
        const CountEmbed = new MessageEmbed()
            .setTitle('Counter')
            .addFields(
                {name: "👥 Total Members", value: `${message.guild.memberCount}`}
            )
            .addFields(
                {name: "🤖 Bot", value: `${message.guild.members.cache.filter(m => m.user.bot).size}`, inline:true}
            )
            .addFields(
                {name: "👤 Human", value: `${message.guild.members.cache.filter(m => !m.user.bot).size}`, inline:true}
            )
            .setColor(COLORS_EMBEED)
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp();
        await message.channel.send({ embeds: [CountEmbed] });
    }
};