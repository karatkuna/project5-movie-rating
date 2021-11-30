let selectedSort = sessionStorage.getItem("sortby") || "popular"
let keywordInput = sessionStorage.getItem("keyword") || $("#keyword").value || ""
const selectedGenre = sessionStorage.getItem("genre") || null

$("#keyword").val(keywordInput)

const p1 = $.getJSON(API_BASE_URL + '/genre/movie/list', apiOptions)
const p2 = $.getJSON(API_BASE_URL + display[selectedSort], apiOptions)

/** Create genre list **/

Promise.all([p1, p2]).then(results => {
  const genres = results[0].genres
  const movies = results[1].results

  let checked = ""

  for(let i = 0; i < genres.length; i++) {
    checked = ""
    const li = $("<li>")

    if(selectedGenre != null && selectedGenre.includes(genres[i].id)) checked = "checked"
    
    $(li).append(`<input type="checkbox" name="genre" class="genre" value="${genres[i].id}" ${checked}> ${genres[i].name}(${genres[i].id})`)
    
    $("#genreList").append(li)
  }

  for(let i = 0; i < $(".sortby").length; i++){
    if($(".sortby")[i].value === selectedSort) $(".sortby")[i].checked = true
  }

  const row = $("<div>").attr("class", "row")
  let count = 0;

  for(let i = 0; i < movies.length; i++) {
    let movie = movies[i]
    let matchGenre = false
    let matchKeyword = false
    let mvGenre = ""
    for(let j = 0; j < movie.genre_ids.length; j++) {
      if(j > 0) mvGenre += ","
      mvGenre += movie.genre_ids[j]
    }

    if(selectedGenre != null && selectedGenre.length > 0) {
      for(let j = 0; j < movie.genre_ids.length; j++) {
        if(selectedGenre.includes(movie.genre_ids[j])) {
          matchGenre = true
          break
        }
      }
    }
    
    keywordInput = keywordInput.toLowerCase()
    let movieTitle = movie.title.toLowerCase()
    if((keywordInput != "" && movieTitle.includes(keywordInput)) ) {
      matchKeyword = true
    }

    if(matchKeyword || matchGenre) {
      const html = `<div class="card col-md-2">
      <a href="/movies/${movie.id}"><img class="d-block w-100" src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}"></a>
              <span>
              <h4 class="card-info"><i class="fa fa-star checked"></i>${movie.vote_average}</h4>
              <p class="card-info card-title"><b>${movie.title}</b></p>
              </span>
            </div>`

      $(row).append(html)
      count++
    }
  }
  
  if(count == 0 && selectedGenre == null && keywordInput.trim() == ""){
    for(let i = 0; i < movies.length; i++) {
      let movie = movies[i]
      let mvGenre = ""
      for(let j = 0; j < movie.genre_ids.length; j++) {
        if(j > 0) mvGenre += ","
        mvGenre += movie.genre_ids[j]
      }

      const html = `<div class="card col-md-2">
      <a href="/movies/${movie.id}"><img class="d-block w-100" src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}"></a>
        <span>
        <h4 class="card-info"><i class="fa fa-star checked"></i>${movie.vote_average}</h4>
        <p class="card-info card-title"><b>${movie.title}</b></p>
        </span>
      </div>`

      $(row).append(html)
    }
  }

  $(".search-result").append(row)

  sessionStorage.removeItem("genre")
  sessionStorage.removeItem("sortby")
  sessionStorage.removeItem("keyword")
})

.catch((error) => {
  console.log(error)
})

if (document.addEventListener) document.addEventListener("click", handleClick, false)
else if (document.attachEvent) document.attachEvent("onclick", handleClick)

function handleClick(event) {
  event = event || window.event;
  event.target = event.target || event.srcElement;

  const element = event.target;

  if(element.type == 'checkbox' || element.type == 'radio') {
    reload();
  }
}

function reload() {
  const keyword =$("#keyword")[0].value.trim()

  if(keyword != "") sessionStorage.setItem("keyword", keyword)

  let genre = []
  for(let i = 0; i < $('.genre').length; i++) {
    if($('.genre')[i].checked) {
      genre.push($('.genre')[i].value)
    }
  }

  sessionStorage.setItem("genre", genre)

  let sortby = []
  for(let i = 0; i < $('.sortby').length; i++) {
    if($('.sortby')[i].checked) sessionStorage.setItem("sortby", $(".sortby")[i].value)
  }

  location.reload();
}
