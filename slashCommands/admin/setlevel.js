const Levels = require("discord-xp");
const { embeed, errorEmbed, successEmbed } = require("../../helpers/utility");

module.exports = {
  name: "setlevel",
  description: "Set member level",
  category: "admin",
  userPermissions: ["ADMINISTRATOR"],
  options: [
    {
      name: "user",
      description: "Select user",
      type: "USER",
      required: true,
    },
    {
      name: "value",
      description: "Input the level",
      type: "NUMBER",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const targetUser = interaction.options.getUser("user");
    const targetValue = interaction.options.getNumber("value");

    if (targetValue == 0) {
      return interaction.followUp({
        embeds: [errorEmbed("The level cannot be lower than 1")],
      });
    }

    const setLevel = await Levels.setLevel(targetUser.id, interaction.guild.id, targetValue);

    if (setLevel) {
      return interaction.followUp({
        embeds: [successEmbed(`Success set ${targetUser.username} level to ${targetValue}`)],
      });
    }
  },
};
