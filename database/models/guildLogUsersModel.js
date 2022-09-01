const GuildLogSchema = require("../schema/guildLogSchema");

const findGuild = async (guildID) => {
  const guild = await GuildLogSchema.findOne({ guildID });
  return guild;
};

const createLogs = async (guildID, jsonData) => {
  GuildLogSchema.exists({ guildID }, async (err, found) => {
    if (!found) return await GuildLogSchema.create(jsonData);
    return await updateLogs(guildID, jsonData);
  });
};

const updateLogs = async (guildID, jsonData) => {
  await GuildLogSchema.findOneAndUpdate({ guildID }, jsonData);
};

const removeLogs = async (guildID) => {
  await GuildLogSchema.findOneAndDelete({ guildID });
};

module.exports = {
  findGuild,
  createLogs,
  updateLogs,
  removeLogs,
};
