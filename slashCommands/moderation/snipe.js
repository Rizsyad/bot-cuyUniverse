const { embeed } = require("../../helpers/utility");

const moment = require("moment-mini");

module.exports = {
  name: "snipe",
  description: "Show deleted chat",
  category: "moderation",
  userPermissions: ["MANAGE_CHANNELS"],
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
    const snipeEmbeed = embeed({
      author: {
        name: msg.author.tag,
        image: msg.author.displayAvatarURL(),
      },
      image,
      description: msg.content,
      footer: {
        name: `${moment(time).fromNow()} | Snipe ${snipe + 1} / ${
          snipes.length
        }`,
      },
    });

    await interaction.followUp({ embeds: [snipeEmbeed] });
  },
};
