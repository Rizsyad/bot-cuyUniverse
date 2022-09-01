module.exports = {
  name: "simleave",
  description: "Simulator user leave server",
  category: "admin",
  userPermissions: ["ADMINISTRATOR"],
  run: async (client, interaction, args) => {
    interaction.followUp({ content: "simulation leave member" });
    client.emit("guildMemberRemove", interaction.member);
  },
};
