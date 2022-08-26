const { embeed } = require("../../helpers/utility");
const fs = require("fs");

module.exports = {
  name: "help",
  description: "Show help menu",
  category: "general",
  options: [
    {
      name: "cmd",
      description: "Show help menu by command",
      type: "STRING",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const [cmd] = args;

    if (!cmd) {
      let categories = [];
      fs.readdirSync("./slashCommands/").forEach((dir) => {
        if (dir === "context") return;

        const commands = fs
          .readdirSync(`./slashCommands/${dir}/`)
          .filter((file) => file.endsWith(".js"));

        const cmds = commands.map((command) => {
          let file = require(`../../slashCommands/${dir}/${command}`);
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
      const embeedJson = {
        title: "Help Menu",
        description: `Use \`/help\` with command name to get command information.`,
        fields: categories,
        color: "GREEN",
        thumbnail: client.user.displayAvatarURL(),
      };
      const HelpEmbeed = embeed(embeedJson);

      return interaction.followUp({ embeds: [HelpEmbeed] });
    } else {
      const cmdss = cmd.toLowerCase();
      const command = client.slashCommand.get(cmdss);

      if (!command) {
        const noCommandEmbeed = embeed({
          title: "Command not found",
          description: `Use \`/help\` to list all commands.`,
          color: "RED",
          thumbnail: client.user.displayAvatarURL(),
        });
        return interaction.followUp({ embeds: [noCommandEmbeed] });
      }

      const helpMenuEmbeed = embeed({
        title: "Command information",
        fields: [
          {
            name: "Command",
            value: command.name ? `\`${command.name}\`` : "No command name.",
          },
          {
            name: "Description",
            value: command.description
              ? `\`${command.description}\``
              : "No description.",
          },
        ],
        thumbnail: client.user.displayAvatarURL(),
      });

      return interaction.followUp({ embeds: [helpMenuEmbeed] });
    }
  },
};
