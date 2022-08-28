const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    guildID: { type: Number, required: true },
    channel1ID: { type: String, required: true, max: 40 },
    channel2ID: { type: String, required: true, max: 40},
    channel3ID: { type: String, required: true, max: 40 }
})

module.exports = mongoose.model( 'GuildStats' , guildSchema);