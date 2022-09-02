const { embeed, errorEmbed, successEmbed } = require("../../helpers/utility");
const { findGuild, createLogs, updateLogs } = require("../../database/models/guildLogUsersModel");

module.exports = {
  name: "simleave",
  description: "Simulator user leave server",
  category: "admin",
  userPermissions: ["ADMINISTRATOR"],
  run: async (client, interaction, args) => {
    const getGuild = await findGuild(interaction.guild.id);

    if (getGuild == null || !getGuild.activeLeaveMessage) {
      return interaction.followUp({
        embeds: [
          errorEmbed(
            "Your Leave Message is disable, please enable first before use this commands."
          ),
        ],
      });
    }

    if (getGuild.activeLeaveMessage) {
      interaction.followUp({ content: "Simulation leave member" });
      client.emit("guildMemberRemove", interaction.member);
    }
  },
};
