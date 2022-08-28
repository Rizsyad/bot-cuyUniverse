const client = require("../index");
const { errorEmbed } = require("../helpers/utility");

client.on("interactionCreate", async (interaction) => {
  if (!interaction.inGuild())
    return interaction.reply("This command can only be used in a server");

  // Slash Command Handling
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const cmd = client.slashCommand.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: "An error has occured " });

    if (
      cmd.userPermissions &&
      !interaction.member.permissions.has(cmd.userPermissions)
    )
      return interaction.followUp({
        embeds: [
          errorEmbed(
            `${client.config.EMOJI.ERROR} You don't have permission for this command`
          ),
        ],
      });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    cmd.run(client, interaction, args);
  }

  // Context Menu Handling
  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommand.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }
});
