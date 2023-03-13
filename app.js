const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/weather.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "2d9669113594ebeb8479fee384f9c7aa";
  const units = "metric";
  const weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    units +
    "&appid=" +
    apiKey;
  https.get(weatherUrl, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDes = weatherData.weather[0].description;
      const city = weatherData.name;
      const icon = weatherData.weather[0].icon;
      const img = " https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1>The temperature in " +
          city +
          " is " +
          temp +
          "</h1>" +
          "<br>" +
          "<h2> The weather is currently a " +
          weatherDes +
          "</h2>"
      );
      res.write("<img src=" + img + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server started on port 3000");
});
