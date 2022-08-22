const { PREFIX, DEFAULT_PREFIX, USER } = require("../config");
const client = require("../index");
const prefix = PREFIX || DEFAULT_PREFIX;

client.on("ready", () => {
  const pickStatus = () => {
    const status = [`for ${prefix}help`, `for fun`];

    let randomStatus = Math.floor(Math.random() * status.length);

    client.user.setActivity(status[randomStatus], {
      type: "WATCHING",
    });
  };

  client.user.setStatus("dnd");

  // 3 sec change status
  setInterval(pickStatus, 3000);

  console.log(`bot is on!`);
});
