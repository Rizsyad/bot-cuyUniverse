const { MessageEmbed } = require("discord.js");
const { COLORS_EMBEED, PREFIX, DEFAULT_PREFIX } = require("../../config");

const fs = require("fs");
const prefix = PREFIX || DEFAULT_PREFIX;

module.exports = {
  name: "help",
  aliases: ["h"],
  category: "general",
  description: "Show help menu",
  run: async (client, message, args) => {
    if (!args[0]) {
      let categories = [];

      fs.readdirSync("./commands/").forEach((dir) => {
        const commands = fs
          .readdirSync(`./commands/${dir}/`)
          .filter((file) => file.endsWith(".js"));

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);
          if (!file.name) return;

          let name = file.name.replace(".js", "");
          return `\`${name}\``;
        });

        let data = new Object();
        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? `No Command YET` : cmds.join(" "),
        };

        categories.push(data);
      });

      const HelpEmbeed = new MessageEmbed()
        .setTitle("Help Menu")
        .setDescription(
          `Use \`${prefix}help\` with command name to get command information.`
        )
        .addFields(categories)
        .setColor("GREEN")
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();

      return message.channel.send({ embeds: [HelpEmbeed] });
    } else {
      const cmdss = args[0].toLowerCase();

      const command =
        client.commands.get(cmdss) ||
        client.commands.find((c) => c.aliases && c.aliases.includes(cmdss));

      if (!command) {
        const noCommandEmbeed = new MessageEmbed()
          .setTitle("Command not found")
          .setDescription(`Use \`${prefix}help\` to list all commands.`)
          .setColor("RED")
          .setThumbnail(client.user.displayAvatarURL())
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setTimestamp();

        return message.channel.send({ embeds: [noCommandEmbeed] });
      }

      const helpMenuEmbeed = new MessageEmbed()
        .setTitle("Command information")
        .addField("Prefix", `\`${prefix}\``)
        .addField(
          "Command",
          command.name ? `\`${command.name}\`` : "No command name."
        )
        .addField(
          "Aliases",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases name."
        )
        .addField(
          "Usage",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Description",
          command.description ? `\`${command.description}\`` : "No description."
        )
        .setColor(COLORS_EMBEED)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();

      return message.channel.send({ embeds: [helpMenuEmbeed] });
    }
  },
};
