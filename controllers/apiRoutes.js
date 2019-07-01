var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models/index.js");

var result = [{}];
var viewStories = [{}];

router.get("/view", function(req, res) {
    db.Article.find({})
    .then(function(dbArticles){
        viewStories.push({dbArticles})
    })
    res.render("index", {
        story: viewStories
    })
});

router.get("/", function(req, res) {
    var fox35Url = "http://www.fox35orlando.com";
    axios.get("http://www.fox35orlando.com/news").then(function(response) {
  var X = cheerio.load(response.data);
  X(".story").each(function(i, element) {
    result.push({
    title: X(element).children().text().trim(),
    link: fox35Url + X(element).find("a").attr("href"),
    img: X(element).children().find("img").attr("data-src"),
    });
    
    db.Article.create(result[i])
    .then(function(dbArticle) {
    console.log("New Story in MDB: " + dbArticle.title)
    })
    .catch(err => {if (err) throw err});
    });
    res.render("index", {
        story: result
        });
    });  
});

router.post("/api/createNote", function(req, res) {
    newNote = {
        email: req.body.email,
        body: req.body.note
    };
    db.Note.create(newNote).then(function(dbNote) {
      return db.Article.findOneAndUpdate({_id: thisArticle.articleID}, {
        Xpush: {note: dbNote._id}
      });
    }).then(function(dbArticle) {
      res.json(dbArticle);
    }).catch(function(err) {
      res.json(err);
    });
  });

  router.post("/api/deleteNote", function(req, res) {
    var comment = req.body;
    db.Note.findByIdAndRemove(comment["_id"]). 
    then(function(response) {
      if (response) {
        res.send("Sucessfully Deleted");
      }
    });
  });

//   router.post("/api/populateNote", function(req, res) {
//     db.Article.findOne({_id: req.body.articleID}).populate("Note")
//     .then(function(response) {
//         db.Note.findOne({'_id': response.note})
//         .then(function(comment) {
//           comment = [comment];
//           console.log("Sending Back One Comment");
//           res.json(comment);
//         });
//       }
//         }).then(function(comments) {
//             res.json(comments); 
//         });
//     }

//     }).catch(function(err) {
//       res.json(err);
//     });
//   });


module.exports = router