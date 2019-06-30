var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models/index.js");

router.get("/", function(req, res) {

var fox35Url = "http://www.fox35orlando.com";

axios.get("http://www.fox35orlando.com/news").then(function(response) {
  var $ = cheerio.load(response.data);
  var result = [{}];
  $(".story").each(function(i, element) {
    result.push({
    title: $(element).children().text().trim(),
    link: fox35Url + $(element).find("a").attr("href")
    });

    db.Article.create(result[i])
        .then(function(dbArticle) {  
        //   console.log("New Article! " + dbArticle);
        console.log(result);
        })
        .catch(function(err) {
          console.log(err);
        });

    });
    console.log("Scrape completed!")
    res.render("index", {
        story: result
    });
    })
});  

module.exports = router;