//load data for single movie onto the page

//$.getJSON("/api/single-movie/" + movie_id)
const p1 = $.getJSON(API_BASE_URL + "/movie/" + movie_id, apiOptions)
const p2 = $.getJSON(API_BASE_URL + "/movie/" + movie_id + "/reviews", apiOptions)

Promise.all([p1, p2]).then(results => {
  const movie = results[0]
  const review = results[1].results

  $("#title").text(movie.title);
  $("#backdrop").attr("src", IMAGE_BASE_URL + movie.backdrop_path)

  const releaseDate = movie.release_date.split("-")
  const releaseYear = releaseDate[0]
  $("#releaseYear").text(releaseYear);

  let genres = ""
  for(let i = 0; i < movie.genres.length; i++) {
    if(i != 0) genres += ", "

    genres += movie.genres[i].name
  }

  $("#genres").text(genres);
  $("#overview").text(movie.overview)
  $("#voteAvg").text(movie.vote_average)
  $("#voteCount").text(movie.vote_count)

  for(let i = 0; i < review.length; i++) {
    let createAt = review[i].created_at.split("T")
    let img =""
    if(review[i].author_details.avatar_path) {
      if(review[i].author_details.avatar_path.includes("http"))
        img = review[i].author_details.avatar_path.replace("/http", "http")
      else
        img = IMAGE_BASE_URL + review[i].author_details.avatar_path

      img = `<img class='user-avatar' src='${img}'>`
    }else{
      img = `<div class="user-abbv">${review[i].author.substr(0, 2)}</div>`
    }

    let classComment = ""
    let addSpace = ""
    let readMore = ""
    if(review[i].content.length > 200) {
      classComment = "class='user-comment'"
      readMore = `<p id='readMore${i}' class='read-more' onclick='readMore(${i})'>...READ MORE...</p>`
    }else{
      for(let j = 0; j < 200-review[i].content.length; j++) {
        addSpace += "-"
      }
    }

    let rating = null
    if(review[i].author_details.rating != null) 
      rating = parseInt(review[i].author_details.rating).toFixed(1)
    else
      rating = "-"
    

    let html = `<div class="user-review-card">
    <div class="user-review-info">
      ${img}
      <p class="user-name">${review[i].author.substr(0, 8)}</p>
      <p class="text-center">${createAt[0]}</p>
    </div>
    <div>
      <p id="userComment${i}" ${classComment}>${review[i].content + addSpace}</p>
      ${readMore}
    </div>
    <div class="user-rating">
      <h4>VOTE</h4>
      <h1>${rating}</h1>
    </div>
  </div>`
    $("#movieReview").append(html)
  }
})


.catch((error) => {
  console.log(error);
  $("main").append("There was an error")
})

function readMore(id) {
  if($("p#readMore"+id).text() == "...READ MORE...") {
    $("p#readMore"+id).text("...SHOW LESS...")
    $("p#userComment" +id).removeClass("user-comment")
  }else{
    $("p#readMore"+id).text("...READ MORE...")
    $("p#userComment" +id).addClass("user-comment")
  }

  $("p#userComment" +id).focus()
}

$("#comment-form").submit((e) => {
  e.preventDefault();

  let ratingVal = $("#userrating").val().trim();
  
  if (typeof parseFloat(ratingVal) !== "number") {
    console.log("not a number" + typeof parseFloat(ratingVal));
    return;
  }
  
  let commentVal = $("#comment").val().trim();
  if (commentVal.length > 0) {
    $.post(`/movies/${movie_id}`, {
      comment: commentVal,
      userrating: ratingVal
    })

    .then((response) => {
      const firstname = "KK"

      let comment, readMore, addSpace = ""
      if(response.comment.length > 200) {
        classComment = "class='user-comment'"
        readMore = `<p id='readMoreb${response.id}' class='read-more' onclick='readMore(b${response.id})'>...READ MORE...</p>`
      }else{
        for(let j = 0; j < 200-response.comment.length; j++) {
          addSpace += "-"
        }
      }

      const html = `<div class="user-review-card">
        <div class="user-review-info">
          <div class="user-abbv">${firstname.substr(0, 2)}</div>
          <p class="user-name">${firstname.substr(0, 8)}</p>
          <p class="text-center">${response.created_at}</p>
        </div>
        <div>
          <p id="userCommentb${response.id}" ${classComment}>${response.comment + addSpace}</p>
          ${readMore}
        </div>
        <div class="user-rating">
          <h4>VOTE</h4>
          <h1>${parseFloat(response.rating).toFixed(1)}</h1>
        </div>
      </div>`

      $("#movieReview").prepend(html)

      $("#userrating").val("")
      $("#comment").val("")

    })

    .catch((error) => {
      console.log(error);
    });
  }
});
