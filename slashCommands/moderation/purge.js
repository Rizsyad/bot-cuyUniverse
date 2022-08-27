module.exports = {
  name: "purge",
  description: "purge message",
  category: "moderation",
  userPermissions: ["MANAGE_CHANNELS"],
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

    if (!count || count < 2 || count > 100) {
      return interaction.followUp({
        content: `${EMOJI.ERROR} Input must be between 2 - 100`,
      });
    }

    const fetchMessage = await interaction.channel.messages.fetch({
      limit: count,
    });

    await interaction.followUp({
      content: `Purged ${count} messages`,
    });

    await interaction.channel
      .bulkDelete(fetchMessage, true)
      .catch((err) => console.error(`Cannot delete message ${err}`));
  },
};
