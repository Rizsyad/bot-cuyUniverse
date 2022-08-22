const { MessageEmbed } = require("discord.js");
const { COLORS_EMBEED } = require("../../config");

module.exports = {
  name: "translate",
  aliases: ["trl"],
  category: "general",
  description:
    "Translate a text to another language (use c/translate list) to get all languange prefix",
  run: async (client, message, args) => {
    const translate = require("@iamtraction/google-translate");
    const language = args[0];
    const text = args.slice(1).join(" ");
    const languages = require("@iamtraction/google-translate/src/languages.js");
    const languagesList = [
      "auto : Automatic",
      "af : Afrikaans",
      "sq : Albanian",
      "am : Amharic",
      "ar : Arabic",
      "hy : Armenian",
      "az : Azerbaijani",
      "eu : Basque",
      "be : Belarusian",
      "bn : Bengali",
      "bs : Bosnian",
      "bg : Bulgarian",
      "ca : Catalan",
      "ceb : Cebuano",
      "ny : Chichewa",
      "zh-cn : Chinese Simplified",
      "zh-tw : Chinese Traditional",
      "co : Corsican",
      "hr : Croatian",
      "cs : Czech",
      "da : Danish",
      "nl : Dutch",
      "en : English",
      "eo : Esperanto",
      "et : Estonian",
      "tl : Filipino",
      "fi : Finnish",
      "fr : French",
      "fy : Frisian",
      "gl : Galician",
      "ka : Georgian",
      "de : German",
      "el : Greek",
      "gu : Gujarati",
      "ht : Haitian Creole",
      "ha : Hausa",
      "haw : Hawaiian",
      "iw : Hebrew",
      "hi : Hindi",
      "hmn : Hmong",
      "hu : Hungarian",
      "is : Icelandic",
      "ig : Igbo",
      "id : Indonesian",
      "ga : Irish",
      "it : Italian",
      "ja : Japanese",
      "jw : Javanese",
      "kn : Kannada",
      "kk : Kazakh",
      "km : Khmer",
      "ko : Korean",
      "ku : Kurdish (Kurmanji)",
      "ky : Kyrgyz",
      "lo : Lao",
      "la : Latin",
      "lv : Latvian",
      "lt : Lithuanian",
      "lb : Luxembourgish",
      "mk : Macedonian",
      "mg : Malagasy",
      "ms : Malay",
      "ml : Malayalam",
      "mt : Maltese",
      "mi : Maori",
      "mr : Marathi",
      "mn : Mongolian",
      "my : Myanmar (Burmese)",
      "ne : Nepali",
      "no : Norwegian",
      "ps : Pashto",
      "fa : Persian",
      "pl : Polish",
      "pt : Portuguese",
      "pa : Punjabi",
      "ro : Romanian",
      "ru : Russian",
      "sm : Samoan",
      "gd : Scots Gaelic",
      "sr : Serbian",
      "st : Sesotho",
      "sn : Shona",
      "sd : Sindhi",
      "si : Sinhala",
      "sk : Slovak",
      "sl : Slovenian",
      "so : Somali",
      "es : Spanish",
      "su : Sundanese",
      "sw : Swahili",
      "sv : Swedish",
      "tg : Tajik",
      "ta : Tamil",
      "te : Telugu",
      "th : Thai",
      "tr : Turkish",
      "uk : Ukrainian",
      "ur : Urdu",
      "uz : Uzbek",
      "vi : Vietnamese",
      "cy : Welsh",
      "xh : Xhosa",
      "yi : Yiddish",
      "yo : Yoruba",
      "zu : Zulu",
    ];

    if (!args[0]) {
      const ErrorEmbed = new MessageEmbed()
        .setTitle("Error")
        .setDescription(
          "Harap masukkan bahasa atau gunakan (c/translate list) untuk mengetahui singkatan semua bahasa"
        )
        .setColor(COLORS_EMBEED)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
      await message.reply({ embeds: [ErrorEmbed] });
    } else if (language in languages) {
      translate(text, { to: language }).then((x) => {
        const TranslateResult =
          x.text.charAt(0).toUpperCase() + x.text.slice(1).toLowerCase();
        const TranslateEmbed = new MessageEmbed()
          .setTitle("Translate")
          .setColor(COLORS_EMBEED)
          .addFields(
            { name: "Your Language", value: text },
            { name: "Translated To", value: TranslateResult }
          )
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setTimestamp();
        message.reply({ embeds: [TranslateEmbed] });
      });
    } else if (args[0] == "list") {
      const ListLanguageEmbed = new MessageEmbed()
        .setTitle("List Language")
        .setColor(COLORS_EMBEED)
        .setDescription(`${languagesList.join("\n")}`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
      message.reply({ embeds: [ListLanguageEmbed] });
    } else {
      const ErrorEmbed = new MessageEmbed()
        .setTitle("Error")
        .setDescription(
          "Bahasa tidak di temukan atau gunakan (c/translate list) untuk mengetahui singkatan semua bahasa"
        )
        .setColor(COLORS_EMBEED)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
      message.reply({ embeds: [ErrorEmbed] });
    }
  },
};
