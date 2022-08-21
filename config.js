require("dotenv").config();

const { TOKEN } = process.env;

module.exports = {
  TOKEN,
  COLORS_EMBEED: "RANDOM",
  MAIN_COLOR: "",
  ERROR_COLOR: "",
  DEFAULT_PREFIX: "?",
  PREFIX: "c/",
  USER: {
    AVATAR:
      "https://cdn.discordapp.com/attachments/1010262515340550204/1010524034364088360/dea.jpg",
    BANNER: "",
  },
  EMOJI: {
    ERROR: "❌",
    SUCCESS: "✅",
  },
  CHANNEL: {
    GHOSTPING: "",
    VERIFIED: "1007947450859921478",
  },
  ROLE: {
    verify: "integrated",
  },
};
