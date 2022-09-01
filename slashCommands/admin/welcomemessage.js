const { embeed, errorEmbed, successEmbed } = require("../../helpers/utility");
const { findGuild, createLogs, updateLogs } = require("../../database/models/guildLogUsersModel");

module.exports = {
  name: "welcomemessage",
  description: "Send Welcome Message in your channel",
  category: "moderation",
  userPermissions: ["ADMINISTRATOR"],
  options: [
    {
      name: "on",
      description: "Enable Welcome Message in your server",
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
          description: "Message Welcome, {user} for tag user",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "off",
      description: "Disable Welcome Message in your server",
      type: "SUB_COMMAND",
    },
  ],
  run: async (client, interaction, args) => {
    const guild = interaction.guild;
    const guildID = guild.id;
    const subcommand = interaction.options.getSubcommand();
    const getGuild = await findGuild(guildID);

    if (subcommand == "on") {
      const welcomeChannelID = interaction.options.getChannel("channel").id;
      const messageID = interaction.options.getString("messageid");
      const getMessage = await interaction.channel.messages.fetch(messageID).catch(() => {});

      if (getMessage?.content === undefined) {
        return interaction.followUp({
          content: "Message is undefined, please enter correct message id",
        });
      }

      const welcomeMessage = getMessage.content;

      if (getGuild.activeWelcomMessage) {
        return interaction.followUp({
          content: "Your Welcome Message is already enable",
        });
      }

      await createLogs(guildID, {
        guildID,
        activeWelcomMessage: true,
        welcomeMessage,
        welcomeChannelID,
      });
      return interaction.followUp({ content: "Success Enable Welcome Message" });
    }

    if (subcommand == "off") {
      if (!getGuild.activeWelcomMessage) {
        return interaction.followUp({ content: "Your Welcome Message is already disable" });
      }

      await updateLogs(guildID, {
        activeWelcomMessage: false,
        welcomeMessage: "",
        welcomeChannelID: "",
      });
      return interaction.followUp({ content: "Turn Off" });
    }
  },
};
