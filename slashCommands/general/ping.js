const { embeed } = require("../../helpers/utility");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    category: "general",
    run: async (client, interaction, args) => {
        const embeedJson = {
            title: "Pong!",
            description: `${client.ws.ping} ms`,
        };
        const PingEmbeed = embeed(embeedJson);

        await interaction.followUp({ embeds: [PingEmbeed] });
    },
};
