const { embeed, errorEmbed, sendFile } = require("../../helpers/utility");
const osintEmail = require("osint-email").default;
const { validateEmail } = require("../../helpers/validation");
const { getExistUsername } = require("../../helpers/requests");
const listUrls = require("../../assets/accounts.json");
const url = require("url");

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
    {
      name: "username",
      description: "Find username of websites to see if an account exists for a given username.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "username",
          description: "Input the username",
          type: "STRING",
          required: true,
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    const subcommand = interaction.options.getSubcommand();
    const email = interaction.options.getString("email") || "";
    const username = interaction.options.getString("username") || "";
    let responseEmbeed = {};
    let file = "";
    let sendMessage = {};

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

    if (subcommand == "username") {
      const found = [];

      await Promise.all(
        listUrls.users.map(async (dataUrl) => {
          const response = await getExistUsername(
            dataUrl.uri.replace("[USERNAME]", username),
            dataUrl.error_string
          );

          if (response === undefined) return;
          found.push(response);
        })
      );

      const responeLinks = found.map((link) => link);

      file = sendFile(`${responeLinks.join("\n") || "None"}`, "output.txt");
    }

    if (responseEmbeed) sendMessage = { embeds: [embeed(responseEmbeed)], ...sendMessage };
    if (file) sendMessage = { files: [file], ...sendMessage };

    await interaction.followUp(sendMessage).catch((err) => {});
  },
};
