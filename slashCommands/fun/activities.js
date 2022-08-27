const { embeed, errorEmbed } = require("../../helpers/utility");

module.exports = {
  name: "activities",
  description: "Start or join a voice channel activity",
  category: "fun",
  options: [
    {
      name: "activities",
      description: "Select a activity you want to start",
      type: "STRING",
      choices: [
        { name: "Youtube", value: "youtube" },
        { name: "Betrayal.io", value: "betrayal" },
        { name: "Fishington", value: "fishing" },
        { name: "Words Snack", value: "wordsnack" },
        { name: "Awkword", value: "awkword" },
        { name: "Sketch heads", value: "Sketchheads" },
        { name: "Ocho", value: "ocho" },
        { name: "Sketchy Artist", value: "sketchyartist" },
        { name: "Meme", value: "meme" },
        { name: "Ask Away", value: "askaway" },
        { name: "Bobble", value: "bobble" },
        { name: "Land.io  (Requires Boost Level 1)", value: "Land" },
        { name: "Poker (Requires Boost Level 1)", value: "poker" },
        { name: "Chess (Requires Boost Level 1)", value: "chess" },
        {
          name: "Checkers in the Park (Requires Boost Level 1)",
          value: "checkers",
        },
        { name: "Letter Tile (Requires Boost Level 1)", value: "lettertile" },
        { name: "Spell Cast (Requires Boost Level 1)", value: "spellcast" },
        { name: "Putt party (Requires Boost Level 1)", value: "puttparty" },
      ],
      required: true,
    },
    {
      name: "voice",
      description: "The voice channel you want to start the activity",
      type: "CHANNEL",
      channelTypes: ["GUILD_VOICE"],
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const [activity, voice] = args;

    client.discordTogether
      .createTogetherCode(voice, activity)
      .then(async (invite) => {
        await interaction.followUp({
          embeds: [
            embeed({
              description: `Click [here](${invite.code}) to start the activity.`,
            }),
          ],
        });
      });
  },
};
