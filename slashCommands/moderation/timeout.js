const { modActionEmbeed } = require("../../helpers/utility");

module.exports = {
  name: "timeout",
  description: "Timeout a member",
  category: "moderation",
  userPermissions: ["MODERATE_MEMBERS"],
  options: [
    {
      name: "member",
      description: "The user to timeout",
      type: "USER",
      required: true,
    },
    {
      name: "duration",
      description: "The duration of timeout",
      type: "NUMBER",
      choices: [
        { name: "60 seconds", value: 60 * 1000 },
        { name: "5 mins", value: 5 * 60 * 1000 },
        { name: "10 mins", value: 10 * 60 * 1000 },
        { name: "30 mins", value: 30 * 60 * 1000 },
        { name: "1 hr", value: 60 * 60 * 1000 },
        { name: "1 day", value: 24 * 60 * 60 * 1000 },
        { name: "1 week", value: 7 * 24 * 60 * 60 * 1000 },
      ],
      required: true,
    },
    {
      name: "reason",
      description: "Reason for punishment",
      type: "STRING",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const target = interaction.options.getMember("member");
    const duration = interaction.options.getNumber("duration");
    const reason = interaction.options.getString("reason") || "No reason given";
    const { EMOJI } = client.config;

    if (target.user.id === interaction.user.id)
      return await interaction.followUp({
        content: `${EMOJI.ERROR} You cant take action your self`,
      });

    if (
      target.roles.highest.position >= interaction.member.roles.highest.position
    )
      return await interaction.followUp({
        content: `${EMOJI.ERROR} You cant take action on this user as their role is heigher than yours`,
      });

    const timeoutEmbeed = modActionEmbeed(
      "TIMEOUT",
      target.user.tag,
      target.user.id,
      interaction.user.id,
      reason,
      duration
    );

    target.timeout(duration, reason);
    await interaction.followUp({ embeds: [timeoutEmbeed] });
  },
};
