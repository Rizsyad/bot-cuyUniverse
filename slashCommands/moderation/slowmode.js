const ms = require("ms");

module.exports = {
  name: "slowmode",
  description: "slowmode channel",
  category: "moderation",
  options: [
    {
      name: "time",
      description: "set time second",
      type: "STRING",
    },
  ],
  run: async (client, interaction, args) => {
    const [time] = args;
    const { EMOJI } = client.config;

    if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
      return interaction.followUp({
        content: `${EMOJI.ERROR} You don't have the required permission`,
      });
    }

    if (!time) {
      interaction.channel.setRateLimitPerUser(0);
      return interaction.followUp({
        content: `slowmode has been turned off`,
      });
    }

    const rawTime = time;
    const formatms = ms(rawTime);

    if (isNaN(formatms))
      return interaction.followUp({
        content: `${EMOJI.ERROR} Time is not number`,
      });

    if (formatms < 1000)
      return interaction.followUp({
        content: `${EMOJI.ERROR} Mininum time is 1 second`,
      });

    if (formatms >= ms("6h"))
      return interaction.followUp({
        content: `${EMOJI.ERROR} Maximum time is ${ms(ms("6h"), {
          long: true,
        })}`,
      });

    interaction.channel.setRateLimitPerUser(formatms / 1000);
    interaction.followUp({
      content: `slowmode for this channel has been set to **${ms(formatms, {
        long: true,
      })}**`,
    });
  },
};
