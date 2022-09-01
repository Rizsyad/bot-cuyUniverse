const { embeed } = require("../../helpers/utility");
const moment = require("moment-mini");

module.exports = {
  name: "User Information",
  type: "USER",
  run: async (client, interaction, args) => {
    const targetUser = await interaction.guild.members.cache.get(interaction.targetId);

    const { roles, joinedTimestamp, username } = targetUser;
    const { id, tag, createdTimestamp } = targetUser.user;

    const joinMoment = moment(joinedTimestamp).format("LLL");
    const createMoment = moment(createdTimestamp).format("LLL");

    const joinMember = `${joinMoment} (<t:${parseInt(joinedTimestamp / 1000)}:R>)`;
    const createMember = `${createMoment} (<t:${parseInt(createdTimestamp / 1000)}:R>)`;

    const userInfoEmbeed = embeed({
      author: {
        name: tag,
        image: targetUser.user.avatarURL({
          dynamic: true,
          size: 512,
        }),
      },
      thumbnail: targetUser.user.avatarURL({
        dynamic: true,
        size: 512,
      }),
      description: `<@${interaction.targetId}>`,
      fields: [
        { name: "ID", value: id, inline: true },
        { name: "Username", value: username || "None", inline: true },
        { name: "Join Date", value: joinMember },
        { name: "Created Date", value: createMember },
        {
          name: "Roles",
          value: `${
            roles.cache
              .map((role) => role)
              .join(" ")
              .replace("@everyone", " ") || "None"
          }`,
        },
      ],
    });

    await interaction.followUp({ embeds: [userInfoEmbeed] });
  },
};
