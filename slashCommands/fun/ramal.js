const { embeed } = require("../../helpers/utility");

module.exports = {
  name: "ramal",
  description: "Meramalkan sesuatu",
  category: "fun",
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
    const ListResponse = [
      "Hooh Tenan",
      "Yo Ndak Tau Kok Tanya Saya",
      "Ente Kadang-Kadang",
      "Bisa Jadi",
      "Menurut WikiPedia Mustahil",
      "Gabisa",
      "Tanya Sama Diri Sendiri",
    ];

    const embeedJson = {
      title: "Ramal",
      fields: [
        { name: "Pertanyaan", value: `${ramalan}` },
        {
          name: "Hasil Ramalan",
          value: `${ListResponse[Math.floor(Math.random() * 6)]}`,
          inline: true,
        },
      ],
    };

    const RamalEmbed = embeed(embeedJson);
    return interaction.followUp({ embeds: [RamalEmbed] });
  },
};
