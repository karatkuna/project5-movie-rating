const API_BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342'
const API_KEY = 'f7b79f177de20a0d3a881354482e9db4'

const apiOptions = { 
  api_key: API_KEY,
  include_adult: false
  // sort_by
}

const display = {
  'popular': '/movie/popular',
  'topRated': '/movie/top_rated',
  'upcoming': '/movie/upcoming'}
