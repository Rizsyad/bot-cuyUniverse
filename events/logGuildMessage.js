const client = require("../index");
const GuildLogSchema = require("../database/schema/guildLogSchema");
const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");

client.on("guildMemberAdd", async (member) => {
    const guild = member.guild;
    const guildID = member.guild.id;
    const GuildLog = await GuildLogSchema.findOne({ guildID });

    if (GuildLog == null) return;

    if (GuildLog.welcomeMessage) {
        const welcomer = new canvacord.Welcomer()
            .setAvatar(member.user.displayAvatarURL({ dynamic: true }))
            .setDiscriminator(member.user.discriminator)
            .setGuildName(guild.name)
            .setMemberCount(guild.memberCount)
            .setUsername(member.user.username);

        welcomer.build().then((data) => {
            const WelcomeMessageChannel = GuildLog.welcomeChannelID;

            const attachment = new MessageAttachment(data, "WelcomeCard.png");
            client.channels.fetch(WelcomeMessageChannel).then((channel) => {
                return channel.send({
                    content: `Halo <@${member.user.id}>, salken ya cuy :)`,
                    files: [attachment],
                });
            });
        });
    }
});
