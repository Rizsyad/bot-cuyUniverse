const { embeed, errorEmbed } = require("../../helpers/utility");
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

      db.updateStats(guildID, "category", categoryId);

      if (counterChoice == "am") {
        if (getGuild.AllStat !== "0")
          return interaction.followUp({
            embeds: [errorEmbed("The Stat has set you must turn off the stat")],
          });

        const AllStat = await guildChannel
          .create(`👥 | All Members : ${TotalMembers}`, voiceOptions)
          .then((stat) => stat.id);

        db.updateStats(guildID, "AllStat", AllStat);
      }

      if (counterChoice == "mo") {
        if (getGuild.memberStat !== "0")
          return interaction.followUp({
            embeds: [errorEmbed("The Stat has set you must turn off the stat")],
          });

        const memberStat = await guildChannel
          .create(`👤 | Members : ${Human} `, voiceOptions)
          .then((stat) => stat.id);

        db.updateStats(guildID, "memberStat", memberStat);
      }

      if (counterChoice == "bo") {
        if (getGuild.botStat !== "0")
          return interaction.followUp({
            embeds: [errorEmbed("The Stat has set you must turn off the stat")],
          });

        const botStat = await guildChannel
          .create(`🤖 | Bot : ${Bot}`, voiceOptions)
          .then((stat) => stat.id);

        db.updateStats(guildID, "botStat", botStat);
      }

      interaction.followUp({ content: `Success set server Stats` });
    }

    if (subcommand === "delete") {
      if (counterChoice == "am") {
        if (getGuild.AllStat === "0")
          return interaction.followUp({
            embeds: [errorEmbed("The Stat no set")],
          });

        await guildChannel.cache.get(getGuild.AllStat).delete();
        db.updateStats(guildID, "AllStat", "0");
      }

      if (counterChoice == "mo") {
        if (getGuild.memberStat === "0")
          return interaction.followUp({
            embeds: [errorEmbed("The Stat no set")],
          });

        await guildChannel.cache.get(getGuild.memberStat).delete();
        db.updateStats(guildID, "memberStat", "0");
      }

      if (counterChoice == "bo") {
        if (getGuild.botStat === "0")
          return interaction.followUp({
            embeds: [errorEmbed("The Stat no set")],
          });

        // const botStat = await guildChannel
        //   .create(`🤖 | Bot : ${Bot}`, voiceOptions)
        //   .then((stat) => stat.id);

        await guildChannel.cache.get(getGuild.botStat).delete();
        db.updateStats(guildID, "botStat", "0");
      }

      interaction.followUp({ content: `Success remove server Stats` });
    }
  },
};
