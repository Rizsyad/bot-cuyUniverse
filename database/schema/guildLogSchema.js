const mongoose = require("mongoose");

const guildLogSchema = mongoose.Schema({
    guildID: { type: Number, required: true },
    welcomeMessage: { type: Boolean, required: true },
    welcomeChannelID: { type: String, required: true, max: 40, default: false },
    leaveMessage: { type: Boolean, required: true },
    leaveChannelID: { type: String, required: true, max: 40, default: false },
});

module.exports = mongoose.model("guildLog", guildLogSchema);
