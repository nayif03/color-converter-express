const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const convert = require("color-convert");



// Set some defaults

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// set lowdb 

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

const { colorStatistic } = require('./db.json')

db.defaults({ colorStatistic: [] })
  .write()
  
// write a function to store colors using lowdb

const saveColorsToDbJson = (req, res) => {
  const color = req.query.color
  db.get('colorStatistic')
    .push(color)
    .write()
}

// Logic:.......



// write a Logger function to print the url and type for each request 

const Logger = (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  console.log('Request Type:', req.method)

  next()
}

app.use(Logger)



app.get("/", (req, res) => {
  res.send("Hi to Express App")
  console.log("welcome to homepage")
});


app.get("/convert", (req, res, next) => {
  if (req.query.color) {
    res.send("query color exist! " + req.query.color)
    next()
  } else {
    res.status(400).send(
      "error: Missing query parameter color"
    )
  }
}, saveColorsToDbJson)

app.get("/convert/keywordtorgb", (req, res, next) => {
  res.send(convert.keyword.rgb(req.query.color))
  console.log("convert from keyword to rgb")
  next()
}, saveColorsToDbJson)


app.get("/statistic", (req, res) => {
  const array = colorStatistic
  res.send(array)

});

app.get("/convert/rgbtohex", (req, res, next) => {

  res.send(convert.rgb.hex(req.query.color))
  console.log("convert from rgb to hex")
  next()
}, saveColorsToDbJson);

app.get("/convert/hextorgb", (req, res, next) => {

  res.send(convert.hex.rgb(req.query.color))
  console.log("convert from hex to rgb")
  next()
}, saveColorsToDbJson);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;

