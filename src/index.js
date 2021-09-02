import { refs } from './js/refs';
import searchImages from './js/apiService';

refs.submitBtn.addEventListener('click', searchImages)
refs.input.addEventListener('input', cleanInput);



let btn = null;

function createListMarkup(data) {
  if (page === 1) {
    createList();
    createListItems(data);
    createBtn();
    createBtnUp();

    scrolling();

    return;
  };
  createListItems(data);
  scrolling();

  return;
}


function cleanInput() {
   if (refs.input.value === '') {
  page = 1;
  const gallery = document.querySelector('.gallery');
     gallery.innerHTML = '';
     btn.remove()
    return;
}
}
//скролит до кнопки
function scrolling() {
  btn = document.querySelector('.loadMoreBtn');
  btn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

//создает ul
function createList() {
  const list = document.createElement('ul');
  list.classList.add('gallery');
  refs.container.insertAdjacentElement('beforeend', list);
  return;
}

//создает разметку галлереи
function createListItems(data) {
//   refs.submitBtn.disabled = true;

  const { hits } = data;
  const markupEl = markup(hits);

  const list = document.querySelector('.gallery');
  list.insertAdjacentHTML('beforeend', markupEl);
}

//создает кнопку "загрузить больше"
function createBtn() {
  const loadMoreBtn = document.createElement('button');
  loadMoreBtn.textContent = 'Load more';
  loadMoreBtn.classList.add('loadMoreBtn');
  loadMoreBtn.classList.add('button');

  refs.container.insertAdjacentElement('beforeend', loadMoreBtn);

  loadMoreBtn.addEventListener('click', searchImages);
}

//создает кнопку "подняться вверх"

function createBtnUp (){
   const upBtn = document.createElement('a');
  upBtn.textContent = 'Up';
  upBtn.classList.add('upBtn');
  upBtn.href = '#submit';

  refs.container.insertAdjacentElement('beforeend', upBtn);
  
};