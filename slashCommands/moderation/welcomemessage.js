const { embeed, errorEmbed, successEmbed } = require("../../helpers/utility");
const GuildLogSchema = require("../../database/schema/guildLogSchema");

module.exports = {
    name: "welcomemessage",
    description: "Send Welcome Message in your channel",
    category: "moderation",
    userPermissions: "ADMINISTRATOR",
    options: [
        {
            name: "on",
            description: "Enable Welcome Message in your server",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "channel",
                    description: "Select channel",
                    type: "CHANNEL",
                    required: true,
                },
            ],
        },
        {
            name: "off",
            description: "Disable Welcome Message in your server",
            type: "SUB_COMMAND",
        },
    ],
    run: async (client, interaction, args) => {
        const guild = interaction.guild;
        const guildID = guild.id;
        const subcommand = interaction.options.getSubcommand();
        const GetGuildLog = await GuildLogSchema.findOne({ guildID });

        if (subcommand == "on") {
            const welcomeChannelID = interaction.options.getChannel("channel").id;
            if (GetGuildLog) {
                if (GetGuildLog.welcomeMessage) {
                    return interaction.followUp({
                        content: "Your Welcome Message is already enable",
                    });
                }
            } else {
                const CreateNewGuildLog = await GuildLogSchema.create({
                    guildID,
                    welcomeMessage: true,
                    welcomeChannelID,
                });
                return interaction.followUp({ content: "Success Enable Welcome Message" });
            }
        }

        if (subcommand == "off") {
            if (GetGuildLog) {
                const DeleteGuildLog = await GuildLogSchema.findOneAndDelete({ guildID });
                return interaction.followUp({ content: "Deleted" });
            } else {
                return interaction.followUp({ content: "Your Welcome Message is already disable" });
            }
        }
    },
};
