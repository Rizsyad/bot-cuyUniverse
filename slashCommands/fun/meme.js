const axios = require("axios");
const { errorEmbed, embeed } = require("../../helpers/utility");

module.exports = {
    name: "meme",
    description: "Send a random meme",
    category: "fun",
    run: async (client, interaction, args) => {
        const { data } = await axios.get("https://some-random-api.ml/meme");
        const memeEmbedJson = {
            title: `${data.caption}`,
            image: data.image,
        };
        const memeEmbed = embeed(memeEmbedJson);

        return interaction.followUp({ embeds: [memeEmbed] });
    },
};
