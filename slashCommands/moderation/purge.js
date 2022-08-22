module.exports = {
  name: "purge",
  description: "purge message",
  options: [
    {
      name: "count",
      description: "count message deleted",
      type: "NUMBER",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const [count] = args;
    const { EMOJI } = client.config;

    if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
      return interaction.followUp({
        content: `${EMOJI.ERROR} You don't have the required permission`,
      });
    }

    if (!count || count < 2 || count > 100) {
      return interaction.followUp({
        content: `${EMOJI.ERROR} Input must be between 2 - 100`,
      });
    }

    const fetchMessage = await interaction.channel.messages.fetch({
      limit: count,
    });

    interaction.channel
      .bulkDelete(fetchMessage, true)
      .catch((err) => console.error(`Cannot delete message ${err}`));

    interaction.followUp({
      content: `Purged ${count} messages`,
    });
  },
};
