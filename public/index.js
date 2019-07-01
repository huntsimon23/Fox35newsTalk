$(document).ready(function() {
  
  $(".post-comment").on("click", function(newComment){
    $.ajax("/api/createNote", {
        method: "POST",
        data: newComment
      })
        .done(function (data) {
          console.log("You have successfully added a new comment!");
          console.log(data);

          window.location.href = '/'
        })
});

// $(".scrape").on("click", function(newArticles){
//     $.ajax("/view", {
//         method: "GET",
//         data: newArticles
//       })
//         .done(function (data) {
//           console.log("You have successfully retrieved articles from the databse!");
//         });
// });
});
