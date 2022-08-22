const { MessageEmbed } = require("discord.js");
const moment = require("moment-mini");

module.exports = {
  name: "snipe",
  description: "Show deleted chat",
  options: [
    {
      name: "page",
      description: "pagenation",
      type: "NUMBER",
    },
  ],
  run: async (client, interaction, args) => {
    const { EMOJI } = client.config;
    const [page] = args;

    if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
      return interaction.followUp({
        content: `${EMOJI.ERROR} You don't have the required permission`,
      });
    }

    const snipes = client.snipes.get(interaction.channel.id);
    if (!snipes)
      return interaction.followUp({
        content: `${EMOJI.ERROR} Tidak ada pesan yang dihapus di channel ini.`,
      });

    const snipe = +page - 1 || 0;
    const target = snipes[snipe];

    if (!target)
      return interaction.followUp({
        content: `${EMOJI.ERROR} Hanya menyimpan ${snipes.length} pesan.`,
      });

    const { msg, time, image } = target;
    const snipeEmbeed = new MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setImage(image)
      .setDescription(msg.content)
      .setFooter(
        `${moment(time).fromNow()} | Snipe ${snipe + 1} / ${snipes.length}`
      )
      .setColor("RANDOM");

    await interaction.followUp({ embeds: [snipeEmbeed] });
  },
};
