const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/weather.html");
});
app.listen(3000, function () {
  console.log("server started on port 3000");
});
