var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Initialize Express
var app = express();

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
var cheerio = require("cheerio");
var axios = require("axios");

var PORT = 3000
var fox35Url = "http://www.fox35orlando.com"
// Make a request via axios to grab the HTML body from the site of your choice
axios.get("http://www.fox35orlando.com/news").then(function(response) {

  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $(".story").each(function(i, element) {

    var title = $(element).children().text().trim();
    var link = $(element).find("a").attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: fox35Url + link,
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
  console.log("Scrape completed")
});

app.listen(PORT, function() {
    console.log("App running on https://localhost:" + PORT);
  });
  