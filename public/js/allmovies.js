const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

$.getJSON("/api/all-movies")
  .then((data) => {
    const { results } = data;

    results.forEach((movie) => {
      const html = `
      
      <div class="card p-3 m-3" style="width: 20rem;">
      <a href="/movies/${movie.id}">
      <img class="card-img-top" src="${
        IMAGE_BASE_URL + movie.poster_path
      }" alt="Card image cap"></img>
          <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
         </div>
         </a>
      </div>
     
    `;
      $("#movies").append(html);
    });
  })
  .catch((error) => {
    console.log(error);
  });
