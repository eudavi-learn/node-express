
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
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

app.get("/name", (req, res) => {
  let { first, last } = req.query;
  
  res.json({ name: `${first} ${last}` });
});

app.post("/name", (req, res) => {
  let { first, last } = req.body;
  
  res.json({ name: `${first} ${last}` });
});

 module.exports = app;
