const ms = require("ms");
const { EMOJI } = require("../../config");

module.exports = {
  name: "slowmode",
  category: "moderation",
  aliases: ["slow"],
  description: "Set showmode to a channel",
  usage: "<time>",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS")) {
      return message.channel.send(
        `${EMOJI.ERROR} You don't have the required permission`
      );
    }

    if (!args[0]) {
      message.channel.setRateLimitPerUser(0);
      return message.channel.send(`slowmode has been turned off`);
    }

    const rawTime = args[0];
    const formatms = ms(rawTime);

    if (isNaN(formatms))
      return message.channel.send(`${EMOJI.ERROR} Time is not number`);

    if (formatms < 1000)
      return message.channel.send(`${EMOJI.ERROR} Mininum time is 1 second`);

    if (formatms >= ms("6h"))
      return message.channel.send(
        `${EMOJI.ERROR} Maximum time is ${ms(ms("6h"), { long: true })}`
      );

    message.channel.setRateLimitPerUser(formatms / 1000);
    message.channel.send(
      `slowmode for this channel has been set to **${ms(formatms, {
        long: true,
      })}**`
    );
  },
};
