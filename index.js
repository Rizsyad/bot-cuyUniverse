require("./webserver");
require("./database/db");

const { Client, Intents, Collection } = require("discord.js");
const { DiscordTogether } = require("discord-together");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILDS,
  ],
});

client.snipes = new Collection();
client.slashCommand = new Collection();
client.discordTogether = new DiscordTogether(client);
client.config = require("./config");
module.exports = client;

require(`./handlers`)(client);

client.login(client.config.TOKEN);
