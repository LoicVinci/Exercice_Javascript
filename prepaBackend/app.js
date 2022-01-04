var express = require("express");
var logger = require("morgan");

var gameRouter = require("./routes/games");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/games", gameRouter);

module.exports = app;
