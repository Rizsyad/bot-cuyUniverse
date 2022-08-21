const { MessageEmbed } = require("discord.js");
const { COLORS_EMBEED } = require("../../config");

module.exports = {
  name: "ping",
  aliases: ["p"],
  category: "general",
  description: "Bot Ping",
  run: async (client, message, args) => {
    const msg = await message.channel.send("pinging...");
    const PingEmbeed = new MessageEmbed()
      .setTitle("Pong!")
      .setDescription(`${client.ws.ping} ms`)
      .setColor(COLORS_EMBEED)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp();

    await message.channel.send({ embeds: [PingEmbeed] });
    msg.delete();
  },
};
