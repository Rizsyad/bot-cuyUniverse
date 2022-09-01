const client = require("../index");
const canvacord = require("canvacord");
const { sendFile } = require("../helpers/utility");
const { findGuild } = require("../database/models/guildLogUsersModel");

client.on("guildMemberRemove", async (member) => {
  const guild = member.guild;
  const guildID = guild.id;
  const guildLogLeave = await findGuild(guildID);

  if (guildLogLeave == null) return;

  if (guildLogLeave.activeLeaveMessage) {
    const leaveMessage = guildLogLeave.leaveMessage;

    const leaver = new canvacord.Leaver()
      .setAvatar(member.user.displayAvatarURL({ dynamic: true }))
      .setDiscriminator(member.user.discriminator)
      .setGuildName(guild.name)
      .setMemberCount(guild.memberCount)
      .setUsername(member.user.username);

    leaver.build().then((data) => {
      const leaveMessageChannel = guildLogLeave.leaveChannelID;
      const attachment = sendFile(data, "LeaveCard.png");

      client.channels.fetch(leaveMessageChannel).then((channel) => {
        return channel.send({
          content: leaveMessage,
          files: [attachment],
        });
      });
    });
  }
});

client.on("guildMemberAdd", async (member) => {
  const guild = member.guild;
  const guildID = guild.id;
  const guildLogJoin = await findGuild(guildID);

  if (guildLogJoin == null) return;

  if (guildLogJoin.activeWelcomMessage) {
    const welcomeMessage = guildLogJoin.welcomeMessage.replace("{user}", `<@${member.user.id}>`);

    const welcomer = new canvacord.Welcomer()
      .setAvatar(member.user.displayAvatarURL({ dynamic: true }))
      .setDiscriminator(member.user.discriminator)
      .setGuildName(guild.name)
      .setMemberCount(guild.memberCount)
      .setUsername(member.user.username);

    welcomer.build().then((data) => {
      const welcomeMessageChannel = guildLogJoin.welcomeChannelID;
      const attachment = sendFile(data, "WelcomeCard.png");

      client.channels.fetch(welcomeMessageChannel).then((channel) => {
        return channel.send({
          content: welcomeMessage,
          files: [attachment],
        });
      });
    });
  }
});
