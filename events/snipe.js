const client = require("../index");

client.on("messageDelete", async (msg) => {
  let snipes = client.snipes.get(msg.channel.id) || [];
  if (snipes.length > 5) snipes = snipes.slice(0, 4);

  snipes.unshift({
    msg,
    image: msg.attachments.first()?.proxyURL || null,
    time: Date.now(),
  });

  client.snipes.set(msg.channel.id, snipes);
});
