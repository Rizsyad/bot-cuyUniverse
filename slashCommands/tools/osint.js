const { embeed, errorEmbed } = require("../../helpers/utility");
const osintEmail = require("osint-email").default;
const url = require("url");
const { validateEmail } = require("../../helpers/validation");

module.exports = {
  name: "osint",
  description: "Open Source Intelligence Tools",
  category: "tools",
  options: [
    {
      name: "leakdata",
      description: "check email address leak",
      type: "SUB_COMMAND",
      options: [
        {
          name: "email",
          description: "input email address want to check",
          type: "STRING",
          required: true,
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    const subcommand = interaction.options.getSubcommand();
    const email = interaction.options.getString("email") || "";
    let responseEmbeed = {};

    if (subcommand == "leakdata") {
      if (!validateEmail(email))
        return interaction.followUp({
          embeds: [errorEmbed("Not valid email address")],
        });

      const response = await osintEmail.search(email);
      const responsePwnd = response.haveIBeenPowned.map((pwnd) => {
        return `${pwnd.title} (${pwnd.values[0].value})\n Leaked data: ${pwnd.values[1].value}\n`;
      });
      const googlePwnd = response.google.map((google) => {
        return `[${url.parse(google.link, true).host}](${google.link})`;
      });

      responseEmbeed = {
        title: "LeakData Email",
        fields: [
          { name: "**Links**", value: `${googlePwnd.join("\n") || "None"}` },
          { name: "**Leak**", value: `${responsePwnd.join("\n") || "None"}` },
          {
            name: "**Pastebin**",
            value: `${response.pastebin.join("\n") || "None"}`,
          },
        ],
      };
    }

    await interaction
      .followUp({
        embeds: [embeed(responseEmbeed)],
      })
      .catch((err) => {});
  },
};
