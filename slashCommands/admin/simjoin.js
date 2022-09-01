module.exports = {
  name: "simjoin",
  description: "Simulator user join server",
  category: "admin",
  userPermissions: ["ADMINISTRATOR"],
  run: async (client, interaction, args) => {
    interaction.followUp({ content: "simulation join member" });
    client.emit("guildMemberAdd", interaction.member);
  },
};
