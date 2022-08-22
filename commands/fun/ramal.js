const { MessageEmbed } = require("discord.js")
const { COLORS_EMBEED } = require("../../config");

module.exports = {
    name: "ramal",
    aliases: ["r"],
    category: "games",
    description: "Meramalkan sesuatu",
    run: async (client, message, args) => {
        if(!args[0]){
            const ErrorEmbed = new MessageEmbed()
                .setTitle("Error")
                .setDescription("Harap Masukkan Ramalan")
                .setColor(COLORS_EMBEED)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp();
            await message.reply({ embeds: [ErrorEmbed] })
        }else{
            const ListResponse = ['Hooh Tenan','Yo Ndak Tau Kok Tanya Saya','Ente Kadang-Kadang','Bisa Jadi','Menurut WikiPedia Mustahil','Gabisa','Tanya Sama Diri Sendiri'];
            const RamalEmbed = new MessageEmbed()
                .setTitle("Ramal")
                .setColor(COLORS_EMBEED)
                .addFields(
                    {name: "Pertanyaan", value: `${args.join(" ")}`},
                    {name: "Hasil Ramalan", value: `${ListResponse[Math.floor(Math.random() * 6)]}`, inline:true}
                )
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp();

            await message.reply({ embeds: [RamalEmbed] });
        }
    }
}