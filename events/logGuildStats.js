const client = require("../index");
const db = require("../database/models/guildStatsModel");
const ms = require("ms");
const { changeNameChannelStats } = require("../helpers/utility");

client.on("ready", async () => {
  const guilds = client.guilds.cache.map((guild) => guild.id);

  guilds.map(async (id) => {
    const guild = client.guilds.cache.get(id);
    const guildID = guild.id;

    const getGuild = await db.findGuild(guildID);
    if (getGuild === null) return;

    const updateStats = async () => {
      const guildChannel = guild.channels;
      const TotalMembers = guild.memberCount;
      const Bot = guild.members.cache.filter((m) => m.user.bot).size;
      const Human = guild.members.cache.filter((m) => !m.user.bot).size;

      if (getGuild.AllStat != 0) {
        await changeNameChannelStats(
          guildID,
          guildChannel,
          getGuild.AllStat,
          `👥 | All Members : ${TotalMembers}`,
          "AllStat"
        );
      }

      if (getGuild.memberStat != 0) {
        await changeNameChannelStats(
          guildID,
          guildChannel,
          getGuild.memberStat,
          `👤 | Human : ${Human}`,
          "memberStat"
        );
      }

      if (getGuild.botStat != 0) {
        await changeNameChannelStats(
          guildID,
          guildChannel,
          getGuild.botStat,
          `🤖 | Bot : ${Bot}`,
          "botStat"
        );
      }
    };

    setInterval(updateStats, ms("15m"));
  });
});
