const { sendFile, errorEmbed } = require("../../helpers/utility");
const { isValidURL } = require("../../helpers/validation");
const Subfinder = require("@sooluh/subfinder");
const subfinder = new Subfinder();

module.exports = {
  name: "subdomainfinder",
  description: "find as many subdomains as possible",
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

    let data = await subfinder.lookup(domain);
    data = data.map((datas) => `${datas.subdomain} (${datas.status})`);
    const file = sendFile(data.join("\n") || "None", "output.txt");

    const outputMessage = { files: [file] };
    await interaction.followUp(outputMessage);
  },
};
