const { errorEmbed, embeed } = require("../../helpers/utility");
const { request } = require("../../helpers/requests");

module.exports = {
  name: "meme",
  description: "Send a random meme",
  category: "fun",
  run: async (client, interaction, args) => {
    const { data } = await request("https://some-random-api.ml/meme", "GET");
    const memeEmbedJson = {
      title: `${data.caption}`,
      image: data.image,
    };
    const memeEmbed = embeed(memeEmbedJson);

    return interaction.followUp({ embeds: [memeEmbed] });
  },
};
