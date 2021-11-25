const selectedGenre = sessionStorage.getItem("genre")
const selectedSort = sessionStorage.getItem("sortby")
const keywordInput = sessionStorage.getItem("keyword")

/** Create genre list **/
$.getJSON(API_BASE_URL + '/genre/movie/list', apiOptions)
.then((data) => {
  const { genres } = data
  let checked = ""

  genres.forEach((genre) => {
    checked = ""
    const li = $("<li>")

    if(selectedGenre && selectedGenre.includes(genre.id) ) checked = "checked"
    
    $(li).append(`<input type="checkbox" name="genre" class="genre" value="${genre.id}" ${checked}> ${genre.name}(${genre.id})`)
    
    $("#genreList").append(li)
  })
})
.catch((error) => {
  console.log(error)
})

const pages = 2
const start = 1
let nrow = 0
let count = 0

if(!selectedSort) selectedSort = "popular"

$("#keyword")[0].value = keywordInput

for(let i = 0; i < $(".sortby").length; i++){
  if($(".sortby")[i].value === selectedSort) $(".sortby")[i].checked = true
} 

for(let i = start; i <= (5 + start); i++ ) {
  apiOptions.page = i

  $.getJSON(API_BASE_URL + display[selectedSort], apiOptions)
  .then(data => {
    const { results } = data
    let limit = 5
    let row = null
   
    results.forEach((movie) => {
      if(count === 0) {
        row = $("<div>").attr("class", "row")
      }
      
      if(selectedGenre.length > 0 || keywordInput) {
        for(let j = 0; j < movie.genre_ids.length; j++) {
          
          if(selectedGenre.includes(movie.genre_ids[j]) || movie.title.search(keywordInput) >= 0) { 
            
            const html = `<div class="card col-md-2">
              <img class="d-block w-100" src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}">
              <span>
              <h4 class="card-info"><i class="fa fa-star checked"></i>${movie.vote_average}</h4>
              <p class="card-info card-title"><b>${movie.title}</b></p>
              </span>
            </div>`

            $(row).append(html)
            count++
            break
          }
        }
      }else{
        
        const html = `<div class="card col-md-2">
          <img class="d-block w-100" src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}">
          <span>
          <h4 class="card-info"><i class="fa fa-star checked"></i>${movie.vote_average}</h4>
          <p class="card-info card-title"><b>${movie.title}</b></p>
          </span>
        </div>`

        $(row).append(html)
        
        count++;
        
      }

      if(count === limit ) {
        $(".search-result").append(row)
        count = 0
        nrow++
      }
    })

    if(nrow == 0 && count < limit) {
      $(".search-result").append(row)
    }
  })
  .catch(error => {
    console.log(error)
  })
}


if (document.addEventListener) document.addEventListener("click", handleClick, false)
else if (document.attachEvent) document.attachEvent("onclick", handleClick)

function handleClick(event) {
  event = event || window.event;
  event.target = event.target || event.srcElement;

  const element = event.target;

  if(element.type === "radio" || element.type === "checkbox" || element.type === "button" || element.parentNode.type === "button") {
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
    
    $("#myForm").submit()
  }
}