var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

router.get("/", function(req, res) {

var fox35Url = "http://www.fox35orlando.com";

axios.get("http://www.fox35orlando.com/news").then(function(response) {
  var $ = cheerio.load(response.data);

  $(".story").each(function(i, element) {
    var result = {};
    result.title = $(element).children().text().trim();
    result.link = fox35Url + $(element).find("a").attr("href");

    db.Article.create(result)
        .then(function(dbArticle) {  
          console.log("New Article! " + dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });

    });
    console.log("Scrape completed!")
    res.render("index");
    })
});  

module.exports = router;