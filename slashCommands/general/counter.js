const { embeed } = require("../../helpers/utility");

module.exports = {
    name: "counter",
    description: "Show server members",
    category: "general",
    run: async (client, interaction, args) => {
        const TotalMembers = interaction.guild.memberCount;
        const Bot = interaction.guild.members.cache.filter(
            (m) => m.user.bot
        ).size;
        const Human = TotalMembers - Bot;

        const embeedJson = {
            title: "Counter",
            fields: [
                { name: "👥 Total Members", value: `${TotalMembers}` },
                { name: "🤖 Bot", value: `${Bot}`, inline: true },
                { name: "👤 Human", value: `${Human}`, inline: true },
            ],
        };

        const CountEmbed = embeed(embeedJson);

        await interaction.followUp({ embeds: [CountEmbed] });
    },
};
