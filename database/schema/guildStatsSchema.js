const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  guildID: { type: Number, required: true },
  category: { type: String, max: 40, default: "0" },
  memberStat: { type: String, max: 40, default: "0" },
  botStat: { type: String, max: 40, default: "0" },
  AllStat: { type: String, max: 40, default: "0" },
});

module.exports = mongoose.model("GuildStats", guildSchema);
