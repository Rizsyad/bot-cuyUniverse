require("dotenv").config();
const {embeed, errorEmbed} = require('../../helpers/utility');
const GuildStatsSchema = require('../../database/schema/guildStatsSchema');

module.exports = {
    name: "serverstats",
    description: "Count server member",
    category: "moderation",
    run: async (client, interaction, args) => {
        const { EMOJI } = client.config;
        const guildID = interaction.guild.id;  
        const TotalMembers = interaction.guild.memberCount;
        const Bot = interaction.guild.members.cache.filter((m) => m.user.bot).size;
        const Human = TotalMembers - Bot;
  
        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
            return interaction.followUp({embeds: [errorEmbed(`${EMOJI.ERROR} You don't have the required permission`)] });
        }

        await GuildStatsSchema.create({
            guildID: guildID,
            channel1ID: 0,
            channel2ID: 0,
            channel3ID: 0,
        });

        interaction.guild.channels.create('SERVER STATS', {
            type: "GUILD_CATEGORY",
        }).then(async (StatsCategory) => {
            const channel1 = interaction.guild.channels.create(`👥 | All Members : ${TotalMembers} `, {
                type: "GUILD_VOICE",
                permissionOverwrites: [
                   {
                        id: interaction.guild.roles.everyone,
                        allow: ['VIEW_CHANNEL'],
                        deny: ['CONNECT', 'READ_MESSAGE_HISTORY']
                   }
                ],
                parent: StatsCategory
            })
    
            const channel2 = interaction.guild.channels.create(`👤 | Members : ${Human} `, {
                type: "GUILD_VOICE",
                permissionOverwrites: [
                   {
                        id: interaction.guild.roles.everyone, 
                        allow: ['VIEW_CHANNEL'], 
                        deny: ['CONNECT', 'READ_MESSAGE_HISTORY']
                   }
                ],
                parent: StatsCategory
            })
    
            const channel3 = interaction.guild.channels.create(`🤖 | Bot : ${Bot}`, {
                type: "GUILD_VOICE", 
                permissionOverwrites: [
                   {
                        id: interaction.guild.roles.everyone,
                        deny: ['CONNECT', 'READ_MESSAGE_HISTORY']
                   }
                ],
                parent: StatsCategory
            })
            function UpdateData(){
                channel1.then(async (channel) => {
                    console.log(channel.id)
                    await GuildStatsSchema.findOneAndUpdate({ guildID: guildID }, {
                        channel1ID: channel.id
                    })
                })
                channel2.then(async (channel) => {
                    console.log(channel.id)
                    await GuildStatsSchema.findOneAndUpdate({ guildID: guildID }, {
                        channel2ID: channel.id
                    })
                })
                channel3.then(async (channel) => {
                    console.log(channel.id)
                    await GuildStatsSchema.findOneAndUpdate({ guildID: guildID }, {
                        channel3ID: channel.id
                    })
                })
            }
            UpdateData();
            interaction.guild.channels.setPositions([{ channel: StatsCategory.id, position: 0 }])
            const StatsEmbedJson = {
                title: "Success",
                description: "Server Stats has been created successfully"
            }
            const StatsEmbed = embeed(StatsEmbedJson);
            return interaction.followUp({embeds: [StatsEmbed]});
        })
    }
}