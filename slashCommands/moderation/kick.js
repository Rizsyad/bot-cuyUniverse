const { modActionEmbeed } = require("../../helpers/utility");

module.exports = {
  name: "kick",
  description: "Kick a member",
  category: "moderation",
  userPermissions: ["KICK_MEMBERS"],
  options: [
    {
      name: "member",
      description: "The user to kick",
      type: "USER",
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

    const kickEmbeed = modActionEmbeed(
      "KICK",
      target.user.tag,
      target.user.id,
      interaction.user.id,
      reason,
      "∞"
    );

    target.kick(reason);
    await interaction.followUp({ embeds: [kickEmbeed] });
  },
};
