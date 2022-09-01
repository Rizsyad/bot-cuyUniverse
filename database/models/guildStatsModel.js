const GuildStatsSchema = require("../schema/guildStatsSchema");

const findGuild = async (guildID) => {
  const guild = await GuildStatsSchema.findOne({ guildID });
  return guild;
};

const createStats = async (guildID, counter = "", channelId = "") => {
  return await GuildStatsSchema.create({ guildID, [counter]: channelId });
};

const updateStats = async (guildID, counter, channelId) => {
  await GuildStatsSchema.findOneAndUpdate({ guildID }, { [counter]: channelId });
};

const removeStats = async (guildID) => {
  await GuildStatsSchema.remove({ guildID });
};

module.exports = {
  findGuild,
  createStats,
  updateStats,
  removeStats,
};
