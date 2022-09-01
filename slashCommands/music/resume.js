const player = require("../../helpers/player");

module.exports = {
  name: "resume",
  description: "resume the current song",
  category: "music",
  run: async (client, interaction) => {
    const queue = player.getQueue(interaction.guildId);

    queue.setPaused(false);

    return interaction.followUp({ content: "Resumed the current track!" });
  },
};
