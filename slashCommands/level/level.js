const Levels = require("discord-xp");
const { MessageAttachment } = require("discord.js");
const { errorEmbed, successEmbed, embeed } = require("../../helpers/utility");

module.exports = {
    name: "level",
    description: "Melihat level user",
    category: "level",
    options: [
        {
            name: "user",
            description: "Tag user",
            type: "USER",
        },
    ],
    run: async (client, interaction, args) => {
        let target = interaction.options.getUser("user") || interaction.user;
        let user = await Levels.fetch(target.id, interaction.guild.id, true);

        if (!user) {
            return interaction.followUp({
                embeds: [errorEmbed("Sepertinya user itu belum mendapatkan xp.")],
            });
        } else {
            const canvacord = require("canvacord");

            const rank = new canvacord.Rank() // Build the Rank Card
                .setAvatar(target.displayAvatarURL({ format: "png", size: 512 }))
                .setCurrentXP(user.cleanXp) // Current User Xp for the current level
                .setRequiredXP(user.cleanNextLevelXp) //The required Xp for the next level
                .setRank(user.position) // Position of the user on the leaderboard
                .setLevel(user.level) // Current Level of the user
                .setProgressBar("#FFFFFF")
                .setUsername(target.username)
                .setDiscriminator(target.discriminator);

            rank.build().then((data) => {
                const attachment = new MessageAttachment(data, "RankCard.png");

                return interaction.followUp({ files: [attachment] });
            });
        }
    },
};
