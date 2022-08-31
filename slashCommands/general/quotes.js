const fetch = require("node-fetch");
const { errorEmbed, embeed } = require("../../helpers/utility");

module.exports = {
    name: "quotes",
    description: "Random quotes of the day",
    category: "fun",
    run: async (client, interaction, args) => {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        if (response.ok) {
            const quotesEmbedJson = {
                title: "Quotes of the day",
                description: `> ${data.content} \n> \n > \`- ${data.author}\``,
            };
            const quotesEmbed = embeed(quotesEmbedJson);
            return interaction.followUp({ embeds: [quotesEmbed] });
        } else {
            return interaction.followUp({ embeds: [errorEmbed("An error occured")] });
        }
    },
};
