import { refs } from './refs';
import markup from '../templates/markup.hbs';
import  createListMarkup  from '../index.js'

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '23114127-913a50287ab6c0ea340feb686';

let page = 1;
let searchValue = '';

export default function searchImages(evt) {
  evt.preventDefault();

  searchValue = refs.input.value;
  return fetch(
    `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchValue}&page=${page}&per_page=12&key=${KEY}`,
  )
    .then(response => response.json())
    .then(i => createListMarkup(i))
    .then(() => page++);
}

