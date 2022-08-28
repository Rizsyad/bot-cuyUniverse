const mongoose = require("mongoose");
const { DB_USER, DB_PASS, DB_HOST } = require("../config");

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/cuybot`)
  .then(() => {
    console.log("Connected to mongodb");
  });
