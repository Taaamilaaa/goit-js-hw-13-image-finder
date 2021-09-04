import searchImages from './js/apiService';
import markup from './templates/markup.hbs';
import '../node_modules/@pnotify/core/BrightTheme.css';
import { error, notice } from '../node_modules/@pnotify/core/dist/PNotify.js';

const refs = {
  input: document.querySelector('input'),
  form: document.querySelector('#search-form'),
  container: document.querySelector('.container'),
  submitBtn: document.querySelector('#submit'),
};

let page = 1;
let btn = null;
let upBtn = null;

refs.form.addEventListener('submit', searchImagesOnBtnClick);
refs.input.addEventListener('input', cleanInput);

function searchImagesOnBtnClick(evt) {
  evt.preventDefault();

  const searchValue = refs.input.value;

  searchImages(searchValue.trim(), page).then(result => {
    if (result.hits.length === 0) {
      error({
        title: 'OOPS :-(',
        text: 'Wrong request! Try again!',
      });
    } else if (evt.target.className === 'search-form') {
      notice({
        title: 'Great !!!',
        text: ` There are ${result.total} results`,
      });
      page = 1;
      return searchImages(searchValue.trim(), page)
        .then(data => createList(data))
        .catch(error => console.log(error));
    } else if (evt.target.className === 'loadMoreBtn button') {
      page += 1;
      return searchImages(searchValue.trim(), page)
        .then(data => createListItems(data))
        .then(i => scrolling(i))
        .catch(error => console.log(error));
    }

    return;
  });

  return;
}

//создает ul и li
function createList(data) {
  refs.submitBtn.disabled = 'disabled';
  const list = document.createElement('ul');
  list.classList.add('gallery');
  refs.container.insertAdjacentElement('beforeend', list);
  createListItems(data);
  createBtn();
  return;
}
//создает разметку галлереи
function createListItems(data) {
  const { hits } = data;
  const markupEl = markup(hits);

  const list = document.querySelector('.gallery');
  list.insertAdjacentHTML('beforeend', markupEl);
}

//создает кнопки ""загрузить больше" и "вверх""
function createBtn() {
  const loadMoreBtn = document.createElement('button');
  loadMoreBtn.textContent = 'Load more';
  loadMoreBtn.classList.add('loadMoreBtn');
  loadMoreBtn.classList.add('button');

  refs.container.insertAdjacentElement('beforeend', loadMoreBtn);
  loadMoreBtn.addEventListener('click', searchImagesOnBtnClick);

  const upBtn = document.createElement('a');
  upBtn.textContent = 'Up';
  upBtn.classList.add('upBtn');
  upBtn.href = '#submit';

  refs.container.insertAdjacentElement('beforeend', upBtn);
}

//скролит до кнопки
function scrolling() {
  btn = document.querySelector('.loadMoreBtn');
  btn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
// очищает разметку галлереи
function cleanInput() {
  const list = document.querySelector('ul');
  btn = document.querySelector('.loadMoreBtn');
  upBtn = document.querySelector('.upBtn');

  if (refs.input.value === '') {
    page = 1;
    if (document.querySelector('.gallery')) {
      btn.remove();

      upBtn.remove();
      const list = document.querySelector('ul');
      list.remove();
      refs.submitBtn.disabled = false;
      return;
    }
  }
}
