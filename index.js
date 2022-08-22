require("./webserver");

const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.slashCommand = new Collection();
client.config = require("./config");

module.exports = client;

require(`./handlers`)(client);

client.login(client.config.TOKEN);
