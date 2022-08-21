const { PREFIX, DEFAULT_PREFIX, CHANNEL, ROLE } = require("../config");
const client = require("../index");
const prefix = PREFIX || DEFAULT_PREFIX;

client.on("message", async (msg) => {
  if (msg.author.bot || !msg.guild) return;

  if (msg.channelId == CHANNEL.VERIFIED && !msg.content.startsWith(prefix)) {
    const roleToGive = msg.guild.roles.cache.find(
      (role) => role.name === ROLE.verify
    );
    msg.member.roles.add(roleToGive);

    msg.channel.send(
      `Terimakasih <@${msg.author.id}>, sudah perkenalan sesuai format. Salam kenal`
    );

    msg.react("✅");
  }

  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.slice(prefix.length).trim().split(" ");
  const cmd = args.shift().toLowerCase();

  if (cmd.length == 0) return;

  let command = client.commands.get(cmd);

  if (!command) {
    command = client.commands.get(client.aliases.get(cmd));
  }

  if (command) command.run(client, msg, args);
});
