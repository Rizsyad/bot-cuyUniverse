const express = require("express");
const app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log(`Web is On`);
});
