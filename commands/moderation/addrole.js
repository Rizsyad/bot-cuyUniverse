const { EMOJI } = require("../../config");

module.exports = {
  name: "addrole",
  aliases: ["giverole"],
  category: "moderation",
  description: "Add role to a user",
  usage: "<user> <role>",
  run: async (client, message, args) => {
    let finduser = args[0];
    let findrole = args.slice(1).join(" ");

    if (!finduser)
      return message.channel.send(`${EMOJI.ERROR} User cannot be empty `);

    if (!findrole)
      return message.channel.send(`${EMOJI.ERROR} Role cannot be empty `);

    if (!message.member.permissions.has("MANAGE_ROLE")) {
      return message.channel.send(
        `${EMOJI.ERROR} You don't have the required permission`
      );
    }

    let user =
      message.guild.members.cache.get(finduser) ||
      message.mentions.members.first();

    const role =
      message.guild.roles.cache.find((r) => r.name.includes(findrole)) ||
      message.mentions.roles.first();

    user.roles.add(role.id);
    message.channel.send(`${EMOJI.SUCCESS} ${user} now has the ${role} role.`);
  },
};
