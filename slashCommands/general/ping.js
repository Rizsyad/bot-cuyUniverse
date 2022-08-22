module.exports = {
  name: "ping",
  description: "returns websocket ping",
  run: async (client, interaction, args) => {
    interaction.followUp({ content: `${client.ws.ping}ms!` });
  },
};
