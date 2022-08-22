const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ramal",
  description: "Meramalkan sesuatu",
  options: [
    {
      name: "ramalan",
      description: "Masukan Ramalan yang anda inginkan",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const [ramalan] = args;
    const { COLORS_EMBEED } = client.config;

    const ListResponse = [
      "Hooh Tenan",
      "Yo Ndak Tau Kok Tanya Saya",
      "Ente Kadang-Kadang",
      "Bisa Jadi",
      "Menurut WikiPedia Mustahil",
      "Gabisa",
      "Tanya Sama Diri Sendiri",
    ];
    const RamalEmbed = new MessageEmbed()
      .setTitle("Ramal")
      .setColor(COLORS_EMBEED)
      .addFields(
        { name: "Pertanyaan", value: `${ramalan}` },
        {
          name: "Hasil Ramalan",
          value: `${ListResponse[Math.floor(Math.random() * 6)]}`,
          inline: true,
        }
      )
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp();

    return interaction.followUp({ embeds: [RamalEmbed] });
  },
};
