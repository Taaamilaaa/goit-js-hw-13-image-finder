import { refs } from './refs';
import markup from '../templates/markup.hbs';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '23114127-913a50287ab6c0ea340feb686';

refs.input.addEventListener('input', cleanInput);


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


let btn = null;
let upBtn = null;

function createListMarkup(data) {
  if (page === 1) {
    createList();
    createListItems(data);
    createBtn();
    scrolling();

    return;
  }
  createListItems(data);
  scrolling();

  return;
};

function cleanInput() {
  if (refs.input.value === '') {
    page = 1;
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    btn.remove();
    upBtn = document.querySelector('.upBtn');
    upBtn.remove();
    return;
  }
};

//скролит до кнопки
function scrolling() {
  btn = document.querySelector('.loadMoreBtn');
  btn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
};

//создает ul
function createList() {
  const list = document.createElement('ul');
  list.classList.add('gallery');
  refs.container.insertAdjacentElement('beforeend', list);
  return;
};

//создает разметку галлереи
function createListItems(data) { 

  const { hits } = data;
  const markupEl = markup(hits);

  const list = document.querySelector('.gallery');
  list.insertAdjacentHTML('beforeend', markupEl);
};

//создает кнопки ""загрузить больше" и "вверх""
function createBtn() {
  const loadMoreBtn = document.createElement('button');
  loadMoreBtn.textContent = 'Load more';
  loadMoreBtn.classList.add('loadMoreBtn');
  loadMoreBtn.classList.add('button');

  refs.container.insertAdjacentElement('beforeend', loadMoreBtn);
  loadMoreBtn.addEventListener('click', searchImages);

  const upBtn = document.createElement('a');
  upBtn.textContent = 'Up';
  upBtn.classList.add('upBtn');
  upBtn.href = '#submit';

  refs.container.insertAdjacentElement('beforeend', upBtn);

};
