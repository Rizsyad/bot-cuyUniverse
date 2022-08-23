const express = require("express");
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/public'));

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/home.html"))
});

app.listen(3000, () => {
  console.log(`Web is On`);
});
