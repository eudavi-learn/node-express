
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  
  next();
});

app.get("/now", (req, res, next) => {
  let currentTime = new Date().toString();
  
  req.time = currentTime;
  next();
}, (req, res) => {
  res.json({ time: req.time });
});

app.get("/", (req, res) => {
  res.sendFile( __dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  res.json({ message: "Hello json"});
})

app.get("/:word/echo", (req, res) => {
  let { word } = req.params;
  
  res.json({ echo: word });
});

 module.exports = app;
