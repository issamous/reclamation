import API_TOKEN from '../Helpers/token'
// API/TMDBApi.js
export function getFilmsFromApiWithSearchedText () {
//  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
const url = 'http://webhose.io/filterWebContent?token=' + API_TOKEN + '&format=json&sort=crawled&q=language%3Aarabic%20thread.country%3ATN'
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getImageFromApi (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetailFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
