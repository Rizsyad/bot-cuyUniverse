const { embeed, errorEmbed, successEmbed } = require("../../helpers/utility");
const { findGuild, createLogs, updateLogs } = require("../../database/models/guildLogUsersModel");

module.exports = {
  name: "simjoin",
  description: "Simulator user join server",
  category: "admin",
  userPermissions: ["ADMINISTRATOR"],
  run: async (client, interaction, args) => {
    const getGuild = await findGuild(interaction.guild.id);

    if (getGuild == null || !getGuild.activeWelcomMessage) {
      return interaction.followUp({
        embeds: [
          errorEmbed(
            "Your Welcome Message is disable, please enable first before use this commands."
          ),
        ],
      });
    }

    if (getGuild.activeWelcomMessage) {
      interaction.followUp({ content: "Simulation joinmember" });
      client.emit("guildMemberAdd", interaction.member);
    }
  },
};
