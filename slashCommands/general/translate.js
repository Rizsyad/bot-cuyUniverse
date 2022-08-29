const translate = require("@iamtraction/google-translate");
const { embeed, errorEmbed } = require("../../helpers/utility");

module.exports = {
    name: "translate",
    description: "Translate a text to another language",
    category: "general",
    options: [
        {
            name: "text",
            description: "Your Text",
            type: "STRING",
            required: true,
        },
        {
            name: "language1",
            description: "Language A-E",
            type: "STRING",
            choices: [
                { name: "Automatic", value: "auto" },
                { name: "Afrikaans", value: "af" },
                { name: "Albanian", value: "sq" },
                { name: "Amharic", value: "am" },
                { name: "Arabic", value: "ar" },
                { name: "Armenian", value: "hy" },
                { name: "Azerbaijani", value: "az" },
                { name: "Basque", value: "eu" },
                { name: "Belarusian", value: "be" },
                { name: "Bengali", value: "bn" },
                { name: "Bosnian", value: "bs" },
                { name: "Bulgarian", value: "bg" },
                { name: "Catalan", value: "ca" },
                { name: "Cebuano", value: "ceb" },
                { name: "Chichewa", value: "ny" },
                { name: "Chinese Simplified", value: "zh-cn" },
                { name: "Chinese Traditional", value: "zh-tw" },
                { name: "Corsican", value: "co" },
                { name: "Croatian", value: "hr" },
                { name: "Czech", value: "cs" },
                { name: "Danish", value: "da" },
                { name: "Dutch", value: "nl" },
                { name: "English", value: "en" },
                { name: "Esperanto", value: "eo" },
            ],
        },
        {
            name: "language2",
            type: "STRING",
            description: "Language E-J",
            choices: [
                { name: "Estonian", value: "et" },
                { name: "Filipino", value: "tl" },
                { name: "Finnish", value: "fi" },
                { name: "French", value: "fr" },
                { name: "Frisian", value: "fy" },
                { name: "Galician", value: "gl" },
                { name: "Georgian", value: "ka" },
                { name: "German", value: "de" },
                { name: "Greek", value: "el" },
                { name: "Gujarati", value: "gu" },
                { name: "Haitian Creole", value: "ht" },
                { name: "Hausa", value: "ha" },
                { name: "Hawaiian", value: "haw" },
                { name: "Hebrew", value: "iw" },
                { name: "Hindi", value: "hi" },
                { name: "Hmong", value: "hmn" },
                { name: "Hungarian", value: "hu" },
                { name: "Icelandic", value: "is" },
                { name: "Igbo", value: "ig" },
                { name: "Indonesian", value: "id" },
                { name: "Irish", value: "ga" },
                { name: "Italian", value: "it" },
                { name: "Japanese", value: "ja" },
                { name: "Javanese", value: "jw" },
            ],
        },
        {
            name: "language3",
            description: "language K-P",
            type: "STRING",
            choices: [
                { name: "Kannada", value: "kn" },
                { name: "Kazakh", value: "kk" },
                { name: "Khmer", value: "km" },
                { name: "Korean", value: "ko" },
                { name: "Kurdish (Kurmanji)", value: "ku" },
                { name: "Kyrgyz", value: "ky" },
                { name: "Lao", value: "lo" },
                { name: "Latin", value: "la" },
                { name: "Latvian", value: "lv" },
                { name: "Lithuanian", value: "lt" },
                { name: "Luxembourgish", value: "lb" },
                { name: "Macedonian", value: "mk" },
                { name: "Malagasy", value: "mg" },
                { name: "Malay", value: "ms" },
                { name: "Malayalam", value: "ml" },
                { name: "Maltese", value: "mt" },
                { name: "Maori", value: "mi" },
                { name: "Marathi", value: "mr" },
                { name: "Mongolian", value: "mn" },
                { name: "Myanmar (Burmese)", value: "my" },
                { name: "Nepali", value: "ne" },
                { name: "Norwegian", value: "no" },
                { name: "Pashto", value: "ps" },
                { name: "Persian", value: "fa" },
            ],
        },
        {
            name: "language4",
            description: "language P-T",
            type: "STRING",
            choices: [
                { name: "Polish", value: "pl" },
                { name: "Portuguese", value: "pt" },
                { name: "Punjabi", value: "pa" },
                { name: "Romanian", value: "ro" },
                { name: "Russian", value: "ru" },
                { name: "Samoan", value: "sm" },
                { name: "Scots Gaelic", value: "gd" },
                { name: "Serbian", value: "sr" },
                { name: "Sesotho", value: "st" },
                { name: "Shona", value: "sn" },
                { name: "Sindhi", value: "sd" },
                { name: "Sinhala", value: "si" },
                { name: "Slovak", value: "sk" },
                { name: "Slovenian", value: "sl" },
                { name: "Somali", value: "so" },
                { name: "Spanish", value: "es" },
                { name: "Sundanese", value: "su" },
                { name: "Swahili", value: "sw" },
                { name: "Swedish", value: "sv" },
                { name: "Tajik", value: "tg" },
                { name: "Tamil", value: "ta" },
                { name: "Telugu", value: "te" },
                { name: "Thai", value: "th" },
                { name: "Turkish", value: "tr" },
            ],
        },
        {
            name: "language5",
            description: "language U-Z",
            type: "STRING",
            choices: [
                { name: "Ukrainian", value: "uk" },
                { name: "Urdu", value: "ur" },
                { name: "Uzbek", value: "uz" },
                { name: "Vietnamese", value: "vi" },
                { name: "Welsh", value: "cy" },
                { name: "Xhosa", value: "xh" },
                { name: "Yiddish", value: "yi" },
                { name: "Yoruba", value: "yo" },
                { name: "Zulu", value: "zu" },
            ],
        },
    ],
    run: async (client, interaction, args) => {
        const [text, ...languages] = args;
        const language = languages[0];
        let embeedJson = {};

        if (!language)
            return interaction.followUp({
                embeds: [errorEmbed("Harap masukkan bahasa")],
            });

        translate(text, { to: language }).then((x) => {
            const TranslateResult =
                x.text.charAt(0).toUpperCase() + x.text.slice(1).toLowerCase();

            embeedJson = {
                title: "Translate",
                fields: [
                    { name: "Your Language", value: text },
                    { name: "Translated To", value: TranslateResult },
                ],
            };
            const TranslateEmbed = embeed(embeedJson);
            interaction.followUp({ embeds: [TranslateEmbed] });
        });
    },
};
