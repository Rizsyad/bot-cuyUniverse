const {
  errorEmbed,
  successEmbed,
  createChannelStats,
  deleteChannelStats,
} = require("../../helpers/utility");
const db = require("../../database/models/guildStatsModel");

module.exports = {
  name: "serverstats",
  description: "Count server member",
  category: "moderation",
  userPermissions: ["MANAGE_CHANNELS"],
  options: [
    {
      name: "create",
      description: "Create or add a new counter",
      type: "SUB_COMMAND",
      options: [
        {
          name: "counter",
          description: "The counter you want to create",
          type: "STRING",
          choices: [
            { name: "All Members", value: "am" },
            { name: "Members Only", value: "mo" },
            { name: "Bots Only", value: "bo" },
          ],
          required: true,
        },
      ],
    },
    {
      name: "delete",
      description: "Remove or delete a counter",
      type: "SUB_COMMAND",
      options: [
        {
          name: "counter",
          description: "The counter you want to create",
          type: "STRING",
          choices: [
            { name: "All Members", value: "am" },
            { name: "Members Only", value: "mo" },
            { name: "Bots Only", value: "bo" },
          ],
          required: true,
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    const subcommand = interaction.options.getSubcommand(); // "create"
    const counterChoice = interaction.options.getString("counter");
    // const channelChoice = interaction.options.getString("channel");

    const guild = interaction.guild;
    const guildID = guild.id;
    const guildChannel = guild.channels;
    const TotalMembers = guild.memberCount;
    const Bot = guild.members.cache.filter((m) => m.user.bot).size;
    const Human = guild.members.cache.filter((m) => !m.user.bot).size;

    let getGuild = await db.findGuild(guildID);

    if (getGuild === null) getGuild = await db.createStats(guildID);

    if (subcommand === "create") {
      const categoryId =
        getGuild.category !== "0" && guildChannel.cache.get(getGuild.category)
          ? getGuild.category
          : await guildChannel
              .create("SERVER STATS", { type: "GUILD_CATEGORY" })
              .then((category) => category.id);

      db.updateStats(guildID, "category", categoryId);

      if (counterChoice == "am") {
        if (getGuild.AllStat !== "0")
          return interaction.followUp({
            embeds: [errorEmbed("The Stat has set you must turn off the stat")],
          });

        await createChannelStats(
          guild,
          categoryId,
          `👥 | All Members : ${TotalMembers}`,
          "AllStat"
        );
      }

      if (counterChoice == "mo") {
        if (getGuild.memberStat !== "0")
          return interaction.followUp({
            embeds: [errorEmbed("The Stat has set you must turn off the stat")],
          });

        await createChannelStats(guild, categoryId, `👤 | Members : ${Human} `, "memberStat");
      }

      if (counterChoice == "bo") {
        if (getGuild.botStat !== "0")
          return interaction.followUp({
            embeds: [errorEmbed("The Stat has set you must turn off the stat")],
          });

        await createChannelStats(guild, categoryId, `🤖 | Bot : ${Bot}`, "botStat");
      }

      interaction.followUp({
        embeds: [
          successEmbed(
            `Success set server Stats. \n Your stats will automatically updated every 15 minutes.`
          ),
        ],
      });
    }

    if (subcommand === "delete") {
      if (counterChoice == "am") {
        if (getGuild.AllStat === "0")
          return interaction.followUp({
            embeds: [errorEmbed("The Stat no set")],
          });

        await deleteChannelStats(guildID, guildChannel, getGuild.AllStat, "AllStat");

        // await guildChannel.cache.get(getGuild.AllStat).delete();
        // db.updateStats(guildID, "AllStat", "0");

        // return interaction.followUp({ embeds: [successEmbed(`Success remove server Stats`)] });
      }

      if (counterChoice == "mo") {
        if (getGuild.memberStat === "0")
          return interaction.followUp({
            embeds: [errorEmbed("The Stat no set")],
          });

        await deleteChannelStats(guildID, guildChannel, getGuild.memberStat, "memberStat");
        // await guildChannel.cache.get(getGuild.memberStat).delete();
        // db.updateStats(guildID, , "0");

        // return interaction.followUp({ embeds: [successEmbed(`Success remove server Stats`)] });
      }

      if (counterChoice == "bo") {
        if (getGuild.botStat === "0")
          return interaction.followUp({
            embeds: [errorEmbed("The Stat no set")],
          });

        await deleteChannelStats(guildID, guildChannel, getGuild.botStat, "botStat");
        // await guildChannel.cache.get(getGuild.botStat).delete();
        // db.updateStats(guildID, "botStat", "0");
      }

      return interaction.followUp({ embeds: [successEmbed(`Success remove server Stats`)] });
    }
  },
};
