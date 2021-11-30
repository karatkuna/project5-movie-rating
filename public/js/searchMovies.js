let selectedSort = sessionStorage.getItem("sortby") || "popular"
const keywordInput = sessionStorage.getItem("keyword") || $("#keyword").value || ""
const selectedGenre = sessionStorage.getItem("genre")

$("#keyword").val(keywordInput)

const p1 = $.getJSON(API_BASE_URL + '/genre/movie/list', apiOptions)
const p2 = $.getJSON(API_BASE_URL + display[selectedSort], apiOptions)


/** Create genre list **/

Promise.all([p1, p2]).then(results => {
  const genres = results[0].genres
  const movies = results[1].results
  console.log(movies)

  let checked = ""

  for(let i = 0; i < genres.length; i++) {
    checked = ""
    const li = $("<li>")

    if(selectedGenre == genres[i].id) checked = "checked"
    
    $(li).append(`<input type="checkbox" name="genre" class="genre" value="${genres[i].id}" ${checked}> ${genres[i].name}(${genres[i].id})`)
    
    $("#genreList").append(li)
  }

  for(let i = 0; i < $(".sortby").length; i++){
    if($(".sortby")[i].value === selectedSort) $(".sortby")[i].checked = true
  }

  const row = $("<div>").attr("class", "row")

  for(let i = 0; i < movies.length; i++) {
    let movie = movies[i]

    if(typeof selectselectedGenre != 'undefined' && selectselectedGenre.length > 0) {
      for(let j = 0; j < selectselectedGenre.length; j++) {
        if(selectedGenre[i] == )
      }
    }

    if((keywordInput != "" && movie.title.toLowerCase().includes(keywordInput.toLowerCase())) || ) {
      console.log(keywordInput + "=" + movie.title.toLowerCase())
      const html = `<div class="card col-md-2">
              <img class="d-block w-100" src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}">
              <span>
              <h4 class="card-info"><i class="fa fa-star checked"></i>${movie.vote_average}</h4>
              <p class="card-info card-title"><b>${className}</b></p>
              </span>
            </div>`

      $(row).append(html)
    }
    
    if(keywordInput == "") {
      const html = `<div class="${className}">
              <img class="d-block w-100" src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}">
              <span>
              <h4 class="card-info"><i class="fa fa-star checked"></i>${movie.vote_average}</h4>
              <p class="card-info card-title"><b>${className}</b></p>
              </span>
            </div>`

      $(row).append(html)
    }
  }

  $(".search-result").append(row)
  loadMovies()
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

  if(element.type == 'checkbox') {
    loadMovies();
  }
}

function loadMovies() {
  let count = 0
  let className = ""
  // for(let i = 0; i < $(".genre").length; i++ ) {
    
  //   className = $(".genre")[i].value

  //   if($(".genre")[i].checked == true) {
  //     $(`.g${className}`).css("display", "flex");
  //     count++
  //   }else{
  //     $(`.g${className}`).css("display", "none");
  //   }
  // }

  if(count === 0) {
    for(let i = 0; i < $(".genre").length; i++ ) {
      className = ".g" + $(".genre")[i].value
      $(className).css("display", "flex");
    }
  }
}

function reload() {
  sessionStorage.removeItem("genre")
  sessionStorage.removeItem("sortby")
  sessionStorage.removeItem("keyword")

  const keyword =$("#keyword")[0].value.trim()

  if(keyword != "") sessionStorage.setItem("keyword", keyword)

  let genre = []
  for(let i = 0; i < $('.genre').length; i++) {
    if($('.genre')[i].checked) genre.push($('.genre')[i].value)
  }

  sessionStorage.setItem("genre", genre)

  let sortby = []
  for(let i = 0; i < $('.sortby').length; i++) {
    if($('.sortby')[i].checked) sessionStorage.setItem("sortby", $(".sortby")[i].value)
  }

  location.reload();
}