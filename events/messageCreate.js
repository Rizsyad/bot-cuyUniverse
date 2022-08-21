const { PREFIX, DEFAULT_PREFIX, CHANNEL, ROLE } = require("../config");
const client = require("../index");
const prefix = PREFIX || DEFAULT_PREFIX;

client.on("messageCreate", async (msg) => {
  if (msg.author.bot || !msg.content.startsWith(prefix) || !msg.guild) return;

  const args = msg.content.slice(prefix.length).trim().split(" ");
  const cmd = args.shift().toLowerCase();

  if (cmd.length == 0) return;

  let command = client.commands.get(cmd);

  if (!command) {
    command = client.commands.get(client.aliases.get(cmd));
  }

  if (command) command.run(client, msg, args);
});
