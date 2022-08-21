const fs = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Commands List");
table.setHeading("Command", "Status Command ");
const { EMOJI } = require("../config");

module.exports = (client) => {
  // command handle start
  fs.readdirSync("./commands/").forEach((dir) => {
    const commands = fs
      .readdirSync(`./commands/${dir}`)
      .filter((file) => file.endsWith(".js"));

    for (let files of commands) {
      let get = require(`../commands/${dir}/${files}`);

      if (get.name) {
        client.commands.set(get.name, get);
        table.addRow(files, EMOJI.SUCCESS);
      } else {
        table.addRow(files, EMOJI.ERROR);
        continue;
      }

      if (get.aliases && Array.isArray(get.aliases)) {
        get.aliases.forEach((alias) => {
          client.aliases.set(alias, get.name);
        });
      }
    }
  });
  console.log(table.toString());
  // command handle end

  // event handle start
  fs.readdirSync("./events/").forEach((dir) => {
    const events = fs
      .readdirSync(`./events/`)
      .filter((file) => file.endsWith(".js"));

    for (let files of events) {
      let get = require(`../events/${files}`);

      if (!get.name) continue;

      client.events.set(get.name, get);
    }
  });
  // event handle end
};
