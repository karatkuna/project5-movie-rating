$.getJSON(APT_BASE_URL + '/discover/movie', apiOptions)
.then((data) => {
    const{ results } = data
    console.log(data)
    
    results.forEach((movie) => {
     const html = `
     <a href = "movies/${movie.id}">
     <div>
        <h3>${movie.title}</h3>
        <img src = "${ IMAGE_BASE_URL+ movie.poster_path }">
        </a>
       
     </div>
     <div>
       
         <strong>Rating  &#9733</strong>${movie.vote_average}
         <strong>Release Date</strong>${movie.release_date}
         </div>
       
    
     `

        $("#movies").append(html)
    })
})
.catch((error) => {
    console.log(error)
})