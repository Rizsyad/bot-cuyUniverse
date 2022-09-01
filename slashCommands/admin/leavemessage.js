const { embeed, errorEmbed, successEmbed } = require("../../helpers/utility");
const { findGuild, createLogs, updateLogs } = require("../../database/models/guildLogUsersModel");

module.exports = {
  name: "leavemessage",
  description: "Send Leave Message in your channel",
  category: "moderation",
  userPermissions: ["ADMINISTRATOR"],
  options: [
    {
      name: "on",
      description: "Enable Leave Message in your server",
      type: "SUB_COMMAND",
      options: [
        {
          name: "channel",
          description: "Select channel",
          type: "CHANNEL",
          required: true,
        },
        {
          name: "messageid",
          description: "Message Leave",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "off",
      description: "Disable Leave Message in your server",
      type: "SUB_COMMAND",
    },
  ],
  run: async (client, interaction, args) => {
    const guild = interaction.guild;
    const guildID = guild.id;
    const subcommand = interaction.options.getSubcommand();
    const getGuild = await findGuild(guildID);

    if (subcommand == "on") {
      const leaveChannelID = interaction.options.getChannel("channel").id;
      const messageID = interaction.options.getString("messageid");
      const getMessage = await interaction.channel.messages.fetch(messageID).catch(() => {});

      if (getMessage?.content === undefined) {
        return interaction.followUp({
          content: "Message is undefined, please enter correct message id",
        });
      }

      const leaveMessage = getMessage.content;

      if (getGuild.activeLeaveMessage) {
        return interaction.followUp({
          content: "Your Leave Message is already enable",
        });
      }

      await createLogs(guildID, {
        guildID,
        activeLeaveMessage: true,
        leaveMessage,
        leaveChannelID,
      });
      return interaction.followUp({ content: "Success Enable Leave Message" });
    }

    if (subcommand == "off") {
      if (!getGuild.activeLeaveMessage) {
        return interaction.followUp({ content: "Your Leave Message is already disable" });
      }

      await updateLogs(guildID, {
        activeLeaveMessage: false,
        LeaveMessage: "",
        LeaveChannelID: "",
      });
      return interaction.followUp({ content: "Turn Off" });
    }
  },
};
