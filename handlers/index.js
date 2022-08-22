const ascii = require("ascii-table");
const { EMOJI } = require("../config");
const path = require("path");

const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

let table = new ascii("Commands List");
table.setHeading("Slash Command / Commands", "Status Command ");

module.exports = async (client) => {
  // command handle start
  const Commands = await globPromise(`${process.cwd()}/commands/*/*.js`);
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
  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventFiles.map((value) => require(value));

  // Slash Commands
  const slashCommands = await globPromise(
    `${process.cwd()}/slashCommands/*/*.js`
  );

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
