const mongoose = require("mongoose");
const { DB_USER, DB_PASS, DB_HOST, DEV } = require("../config");
const conn = DEV
  ? "mongodb://127.0.0.1:27017/cuybot"
  : `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/cuybot?retryWrites=true&w=majority`;

mongoose.connect(conn).then(() => {
  console.log("Connected to mongodb");
});

module.exports = {
  conn,
};
