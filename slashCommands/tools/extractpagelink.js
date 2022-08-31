const { sendFileText, errorEmbed } = require("../../helpers/utility");
const { getExtraxtPageLinks } = require("../../helpers/requests");
const { isValidURL } = require("../../helpers/validation");

module.exports = {
  name: "extractpagelink",
  description: "Extract Links From Page",
  category: "tools",
  options: [
    {
      name: "domain",
      description: "Input a domain",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    let domain = interaction.options.getString("domain");

    if (!isValidURL(domain)) {
      return interaction.followUp({ embeds: [errorEmbed(`invalid domain`)] });
    }

    domain = domain
      .replace(/^https?:\/\//, "")
      .replace("www.", "")
      .replace("/", "");

    const outputExtract = await getExtraxtPageLinks(domain);
    const file = sendFileText(outputExtract);

    const outputMessage = { files: [file] };
    await interaction.followUp(outputMessage);
  },
};
