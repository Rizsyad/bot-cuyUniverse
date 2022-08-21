const { MessageEmbed } = require("discord.js");
const { EMOJI } = require("../../config");
const moment = require("moment-mini");

module.exports = {
  name: "snipe",
  category: "moderation",
  aliases: ["snp"],
  description: "Show deleted chat",
  usage: "<page>",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS")) {
      return message.channel.send(
        `${EMOJI.ERROR} You don't have the required permission`
      );
    }

    const snipes = client.snipes.get(message.channel.id);
    if (!snipes)
      return message.channel.send(
        `${EMOJI.ERROR} Tidak ada pesan yang dihapus di channel ini.`
      );

    const snipe = +args[0] - 1 || 0;
    const target = snipes[snipe];

    if (!target)
      return message.channel.send(
        `${EMOJI.ERROR} Hanya menyimpan ${snipes.length} pesan.`
      );

    const { msg, time, image } = target;
    const snipeEmbeed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setImage(image)
      .setDescription(msg.content)
      .setFooter(
        `${moment(time).fromNow()} | Snipe ${snipe + 1} / ${snipes.length}`
      )
      .setColor("RANDOM");

    await message.channel.send({ embeds: [snipeEmbeed] });
  },
};
