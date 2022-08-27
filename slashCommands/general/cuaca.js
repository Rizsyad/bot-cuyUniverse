const { MessageEmbed, Interaction } = require("discord.js");
const { response } = require("express");
const weather = require('weather-js');
const { embeed, errorEmbed } = require("../../helpers/utility");

module.exports = {
  name: "cuaca",
  description: "Melihat kondisi cuaca",
  options: [
    {
      name: "kota",
      description: "Ketik kota yang ingin di lihat kondisi cuacanya",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const [kota] = args;
    const { COLORS_EMBEED } = client.config;
    
    weather.find({ search  : kota, degreeType: "F"}, (error, result) => {
      if(error){
        return interaction.followUp({ embeds: [errorEmbed("Terjadi kesalahan")] })
      }else if (result.length === 0){
        return interaction.followUp({ embeds: [errorEmbed("Kota tidak ditemukan")] })
      }

      var data = result[0];
      let time = `${data.current.observationdate}, ${data.current.observationtime}`;

      const embeedJson = {
        author: {name: "Perkiraan Cuaca", image: `${data.current.imageUrl}`},
        color: COLORS_EMBEED,
        thumbnail: data.current.imageUrl,
        fields: [
          {
            name: "Kota",
            value: `${data.location.name}`,
            inline: false
          },
          {
            name: "Kondisi Cuaca",
            value: `${data.current.skytext}`,
            inline: false
          },
          {
            name: "Temperature",
            value: `${data.current.temperature} °F`,
            inline: false
          },
          {
            name: "Kecepatan Angin",
            value: `${data.current.windspeed}`,
            inline: false
          },
          {
            name: "Zona Waktu",
            value: `${data.location.timezone}`,
            inline: true
          },
          {
            name: "Hari",
            value: `${data.current.day}`,
            inline: false
          }
        ]
      }
      const CuacaEmbed = embeed(embeedJson);

      return interaction.followUp({ embeds: [CuacaEmbed] })
    })
  }
};
