var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models/index.js");

var PORT = 3000

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Initialize Express
var app = express();

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("/public"));
app.use(express.static("./public/images"));
app.use(express.static("./public/css"));
app.use(express.static("/public/vendor/bootstrap/css"));
app.use(express.static("/public/vendor/bootstrap/js"));
app.use(express.static("/public/vendor/bootstrap/jquery"));
app.use(express.static("/public/vendor/bootstrap/js/bootstrap.bundle.min.js"));
app.use(express.static("/public/css/small-business.css"));
app.use(express.static("/public/images/Fox-35-Orlando.jpg"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/apiRoutes.js");
app.use(routes);


app.listen(PORT, function() {
    console.log("App running on localhost:" + PORT);
  });
  