const ascii = require("ascii-table");
const { EMOJI } = require("../config");
const path = require("path");
const fg = require("fast-glob");

let table = new ascii("Commands List");
table.setHeading("Slash Command / Commands", "Status Command ");

module.exports = async (client) => {
  // command handle start
  const Commands = fg.sync(`${process.cwd()}/commands/*/*.js`, { dot: false });
  Commands.map((value) => {
    const get = require(value);
    const filename = path.parse(value).base;

    if (get.name) {
      client.commands.set(get.name, get);
      table.addRow(filename, EMOJI.SUCCESS);
    } else {
      table.addRow(filename, EMOJI.ERROR);
      return;
    }

    if (get.aliases && Array.isArray(get.aliases)) {
      get.aliases.forEach((alias) => {
        client.aliases.set(alias, get.name);
      });
    }
  });
  // command handle end

  // Events
  const eventFiles = fg.sync(`${process.cwd()}/events/*.js`, { dot: false });
  eventFiles.map((value) => require(value));

  // Slash Commands
  const slashCommands = fg.sync(`${process.cwd()}/slashCommands/*/*.js`, {
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
