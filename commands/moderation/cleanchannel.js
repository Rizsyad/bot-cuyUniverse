const { EMOJI } = require("../../config");

module.exports = {
  name: "cleanchannel",
  aliases: ["clear"],
  category: "moderation",
  description: "Clean the channel",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS")) {
      return message.channel.send(
        `${EMOJI.ERROR} You don't have the required permission`
      );
    }

    try {
      message.channel.messages
        .fetch()
        .then((result) => message.channel.bulkDelete(result, true));

      message.channel
        .send(`Cleaned The Channel`)
        .then((msg) => msg.delete({ timeout: 10000 }));
    } catch (error) {
      console.log(error);
      message.channel.send(`There was a problem cleaning up the channel`);
    }
  },
};
