const ascii = require("ascii-table");
const { EMOJI } = require("../config");
const path = require("path");
const fg = require("fast-glob");
const paths = path.join(process.cwd()).replace(/\\/g, "/");

let table = new ascii("Commands List");
table.setHeading("Slash Command", "Status Command ");

module.exports = async (client) => {
  // Events
  const eventFiles = fg.sync(`${paths}/events/*.js`, { dot: false });
  eventFiles.map((value) => require(value));

  // Slash Commands
  const slashCommands = fg.sync(`${paths}/slashCommands/*/*.js`, {
    dot: false,
  });

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    const filename = path.parse(value).base;

    if (file.name) {
      client.slashCommand.set(file.name, file);
      table.addRow(filename, EMOJI.SUCCESS);
    } else {
      table.addRow(filename, EMOJI.ERROR);
      return;
    }

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
  });
  console.log(table.toString());

  client.on("ready", async () => {
    const guild = client.application;
    await guild.commands.set(arrayOfSlashCommands);
  });
};
