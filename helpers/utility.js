const { MessageEmbed, MessageAttachment } = require("discord.js");
const client = require("../index");
const ms = require("ms");
const db = require("../database/models/guildStatsModel");

const { COLORS_EMBEED } = client.config;

const embeed = (embeedJson) => {
  const { title, author, thumbnail, description, image, fields, color, footer } = embeedJson;

  const makeEmbeed = new MessageEmbed();

  if (author) makeEmbeed.setAuthor(author.name, author.image);
  if (title) makeEmbeed.setTitle(title);
  if (thumbnail) makeEmbeed.setThumbnail(thumbnail);
  if (description) makeEmbeed.setDescription(description);
  if (image) makeEmbeed.setImage(image);
  if (fields) makeEmbeed.setFields(...fields);

  if (footer) makeEmbeed.setFooter(footer.name || client.user.username, footer.image || "");
  if (!footer) makeEmbeed.setFooter(client.user.username, client.user.displayAvatarURL());

  if (color) makeEmbeed.setColor(color);
  if (!color) makeEmbeed.setColor(COLORS_EMBEED);

  makeEmbeed.setTimestamp();

  return makeEmbeed;
};

const errorEmbed = (text) => {
  const makeEmbeed = embeed({
    title: "Error",
    description: text,
    color: "RED",
  });
  return makeEmbeed;
};

const successEmbed = (text) => {
  const makeEmbeed = embeed({
    title: "Success",
    description: text,
    color: "GREEN",
  });
  return makeEmbeed;
};

const modActionEmbeed = (action, usertag, userid, modid, reason, duration) => {
  const makeEmbeed = embeed({
    title: `[${action}] ${usertag}`,
    fields: [
      { name: "User", value: `<@${userid}>`, inline: true },
      {
        name: "Moderator",
        value: `<@${modid}>`,
        inline: true,
      },
      { name: "Reason", value: reason, inline: true },
      {
        name: "Duration",
        value: `${ms(duration, { long: true })}`,
        inline: true,
      },
    ],
    color: "RED",
  });

  return makeEmbeed;
};

const changeNameChannelStats = async (guildID, guildChannel, channelId, name, statsName) => {
  await guildChannel
    .fetch(channelId)
    .then((channel) => {
      channel.setName(name);
    })
    .catch((error) => {
      db.updateStats(guildID, statsName, "0");
    });
};

const createChannelStats = async (guild, categoryId, nameChannel, statsName) => {
  const guildID = guild.id;
  const guildChannel = guild.channels;

  const voiceOptions = {
    type: "GUILD_VOICE",
    permissionOverwrites: [
      {
        id: guild.roles.everyone,
        allow: ["VIEW_CHANNEL"],
        deny: ["CONNECT", "READ_MESSAGE_HISTORY"],
      },
    ],
    parent: categoryId,
  };

  const stats = await guildChannel.create(nameChannel, voiceOptions).then((stat) => stat.id);
  await db.updateStats(guildID, statsName, stats);
};

const deleteChannelStats = async (guildID, guildChannel, categoryId, statsName) => {
  const channel = await guildChannel.cache.get(categoryId);

  if (channel) channel.delete();
  db.updateStats(guildID, statsName, "0");
};

const sendFileText = (text) => {
  return new MessageAttachment(Buffer.from(text), "output.txt");
};

module.exports = {
  embeed,
  errorEmbed,
  modActionEmbeed,
  successEmbed,
  changeNameChannelStats,
  createChannelStats,
  deleteChannelStats,
  sendFileText,
};
