const BASE_URL = 'https://pixabay.com/api/';
const KEY = '23114127-913a50287ab6c0ea340feb686';

export default function searchImages(searchValue, page) {
  return fetch(
    `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchValue}&page=${page}&per_page=12&key=${KEY}`,
  ).then(response => response.json()).catch(error => console.log(error));
}


