console.log(movie_id);
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

// load data for single movie onto the page
$.getJSON("/api/single-movie/" + movie_id)
  .then((movie) => {
    $("#title").text(movie.title);
    $("#poster").attr({
      src: IMAGE_BASE_URL + movie.poster_path,
      alt: "Poster for " + movie.title,
    });

    movie.genres.forEach((genre, index) => {
      $("#genres").append(`<span>${genre.name}</span>`);
    });

    $("#summary").text(movie.overview);
  })
  .catch((error) => {
    console.log(error);
    $("main").append("There was an error");
  });

// handle comment form submission
$("#comment-form").submit((e) => {
  e.preventDefault();

  $.post(`/movies/${movie_id}`, {
    comment: $("#comment").val(),
  })
    .then((response) => {
      const html = `
    <div>
      <p><strong>${response.comment}</strong></p>
      <p>${response.created_at}</p>
    </div>
    `;

      $("#comments").prepend(html);
    })
    .catch((error) => {
      console.log(error);
    });
});
