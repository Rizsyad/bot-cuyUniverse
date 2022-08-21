const { CHANNEL, ROLE, EMOJI } = require("../config");
const client = require("../index");
const { isValidVerify } = require("../helpers/validation");

client.on("messageCreate", async (msg) => {
  if (msg.author.bot || !(msg.channelId == CHANNEL.VERIFIED) || !msg.guild)
    return;

  if (isValidVerify(msg.content)) {
    const roleToGive = msg.guild.roles.cache.find(
      (role) => role.name === ROLE.verify
    );
    msg.member.roles.add(roleToGive);

    msg.channel.send(
      `Terimakasih <@${msg.author.id}>, sudah perkenalan sesuai format. Salam kenal`
    );

    msg.react(EMOJI.SUCCESS);
  }

  msg.channel
    .send(`Sorry format yang anda masukan tidak sesuai dengan kriteria validasi silahkan copy lalu isi ya cuy
`);
  msg.react(EMOJI.ERROR);
});
