const { EMOJI } = require("../../config");

module.exports = {
  name: "purge",
  category: "moderation",
  description: "purge message",
  usage: "<count>",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS")) {
      return message.channel.send(
        `${EMOJI.ERROR} You don't have the required permission`
      );
    }

    const count = parseInt(args[0], 10);

    if (!count || count < 2 || count > 100) {
      return message.channel.send(
        `${EMOJI.ERROR} Input must be between 2 - 100`
      );
    }

    const fetchMessage = await message.channel.messages.fetch({ limit: count });

    message.channel
      .bulkDelete(fetchMessage, true)
      .catch((err) => console.error(`Cannot delete message ${err}`));

    message.channel
      .send(`Purged ${count} messages`)
      .then((msg) => msg.delete({ timeout: 10000 }));
  },
};
