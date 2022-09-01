const mongoose = require("mongoose");

const guildLogSchema = mongoose.Schema({
  guildID: { type: Number, required: true },
  activeWelcomMessage: { type: Boolean, default: false },
  activeLeaveMessage: { type: Boolean, default: false },
  welcomeMessage: { type: String, default: "" },
  leaveMessage: { type: String, default: "" },
  welcomeChannelID: { type: String, max: 40, default: "" },
  leaveChannelID: { type: String, max: 40, default: "" },
});

module.exports = mongoose.model("guildLog", guildLogSchema);
