const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "returns websocket ping",
  run: async (client, interaction, args) => {
    const { COLORS_EMBEED } = client.config;

    const PingEmbeed = new MessageEmbed()
      .setTitle("Pong!")
      .setDescription(`${client.ws.ping} ms`)
      .setColor(COLORS_EMBEED)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp();

    await interaction.followUp({ embeds: [PingEmbeed] });
  },
};
