const fetch = require("node-fetch");
const { errorEmbed, embeed } = require("../../helpers/utility");

module.exports = {
    name: "meme",
    description: "Send a random meme",
    category: "fun",
    run: async (client, interaction, args) => {
        const response = await fetch("https://api.imgflip.com/get_memes")
            .then((response) => response.json())
            .then((response) => {
                const { memes } = response.data;
                const randomMemeImg = Math.floor(Math.random() * memes.length);
                const memeImage = memes[randomMemeImg].url;

                const memeEmbedJson = {
                    title: "Random Meme",
                    image: memeImage,
                };
                const memeEmbed = embeed(memeEmbedJson);

                return interaction.followUp({ embeds: [memeEmbed] });
            });
    },
};
