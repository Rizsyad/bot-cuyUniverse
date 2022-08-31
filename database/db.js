const mongoose = require("mongoose");
const { DB_USER, DB_PASS, DB_HOST } = require("../config");
const conn = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/cuybot`;

mongoose.connect(conn).then(() => {
    console.log("Connected to mongodb");
});

module.exports = {
    conn,
};
