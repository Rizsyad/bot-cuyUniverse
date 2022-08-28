const mongoose = require("mongoose");
const { DB_USER, DB_PASS } = require("../config");

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.zape8vm.mongodb.net/test`).then(() => {
    console.log("Connected to mongodb")
})