const GuildStatsSchema = require("../schema/guildStatsSchema");

const findGuild = async (guildID) => {
  const guild = await GuildStatsSchema.findOne({ guildID });
  return guild;
};

const createStats = async (guildID, counter = "", channelId = "") => {
  return await GuildStatsSchema.create({ guildID, [counter]: channelId });
};

const updateStats = async (guildID, counter, channelId) => {
  await GuildStatsSchema.findOneAndUpdate(
    { guildID },
    { [counter]: channelId }
  );
};

module.exports = {
  findGuild,
  createStats,
  updateStats,
};
