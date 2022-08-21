const { TOKEN } = require("./config");
require("./webserver");

const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES
],
  
});
const fs = require("fs");

client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();

client.categories = fs.readdirSync("./commands/");
module.exports = client;

["handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(TOKEN);
