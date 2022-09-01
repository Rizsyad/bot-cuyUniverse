const { errorEmbed, embeed } = require("../../helpers/utility");
const { request } = require("../../helpers/requests");

module.exports = {
  name: "quotes",
  description: "Random quotes of the day",
  category: "fun",
  run: async (client, interaction, args) => {
    const { data } = await request("https://api.quotable.io/random", "GET");
    const quotesEmbedJson = {
      title: "Quotes of the day",
      description: `> ${data.content} \n> \n > \`- ${data.author}\``,
    };
    const quotesEmbed = embeed(quotesEmbedJson);
    return interaction.followUp({ embeds: [quotesEmbed] });
  },
};
