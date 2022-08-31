const Levels = require("discord-xp");
const { errorEmbed, successEmbed, embeed } = require("../../helpers/utility");

module.exports = {
    name: "leaderboard",
    description: "Menampilkan leaderboard level",
    category: "level",
    run: async (client, interaction, args) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 10);

        if (rawLeaderboard.length < 1) {
            return interaction.followUp({ embeds: [errorEmbed("Belum ada orang di leaderboard")] });
        }

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

        const lb = leaderboard.map(
            (e) =>
                `> \`${e.position}\` ** ${e.username}#${e.discriminator}** \n> Level: ${
                    e.level
                }\n> XP: ${e.xp.toLocaleString()}`
        ); // We map the outputs.
        leaderboard.map((e) => {
            if (e.position == 1) {
                FirstRankID = client.users.cache.find((user) => user.username == e.username);
                FirstRankAvatar = FirstRankID.displayAvatarURL({ dynamic: true });
                const LeaderboardEmbedJson = {
                    title: `** Leaderboard Of ${interaction.guild.name} **`,
                    description: lb.join("\n\n"),
                    thumbnail: FirstRankAvatar,
                };
                const LeaderboardEmbed = embeed(LeaderboardEmbedJson);
                return interaction.followUp({ embeds: [LeaderboardEmbed] });
            }
        });
    },
};
