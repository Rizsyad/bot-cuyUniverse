const { Player } = require("discord-player");
const client = require("../index");

const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

module.exports = player;
