for(const k in display ) {  
  $.getJSON(API_BASE_URL + display[k], apiOptions)
  .then((data) => {
    
    const { results } = data
    const length = results.length
    const posters = 6
    const limit = 40

    let count = 0
    let set = 0
    let carouselItem, row

    results.forEach((movie) => {
      if(count === 0) {
        
        carouselItem = $("<div>").attr("class", "carousel-item")
        if(set === 0) carouselItem.addClass("active")

        row = $("<div>").attr("class", "row")
        $(`#${k}`).append(carouselItem.append(row))
      }
      
      if(movie.title.length > limit) {
        movie.title = movie.title.substring(0, limit) + '...'
      }

      const html = `<div class="card col-md-2">
          <img class="d-block w-100" src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}">
          <span>
          <h4 class="card-info"><i class="fa fa-star checked"></i>${movie.vote_average}</h4>
          <p class="card-info card-title"><b>${movie.title}</b></p>
          </span>
        </div>`

      $(row).append(html)

      count++
      
      if(count === posters) {
        set++
        count = 0
      }

      if(set === Math.floor(length/posters)) exit;
    })
  })
  .catch((error) => {
    console.log(error)
  })
}
