const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "counter",
  description: "Show server members",
  run: async (client, interaction, args) => {
    const TotalMembers = interaction.guild.memberCount;
    const Bot = interaction.guild.members.cache.filter((m) => m.user.bot).size;
    const Human = TotalMembers - Bot;
    const CountEmbed = new MessageEmbed()
      .setTitle("Counter")
      .addFields({ name: "👥 Total Members", value: `${TotalMembers}` })
      .addFields({ name: "🤖 Bot", value: `${Bot}`, inline: true })
      .addFields({ name: "👤 Human", value: `${Human}`, inline: true })
      .setColor(client.config.COLORS_EMBEED)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp();

    await interaction.followUp({ embeds: [CountEmbed] });
  },
};
