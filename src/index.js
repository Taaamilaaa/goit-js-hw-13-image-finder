import searchImages from './js/apiService';
import markup from './templates/markup.hbs';


const refs = {
    input: document.querySelector('input'),
    form: document.querySelector('#search-form'),
    container: document.querySelector('.container'),
}

let page = 1;
let btn = null;
let upBtn = null;

refs.form.addEventListener('submit', searchImagesOnBtnClick);
refs.input.addEventListener('input', cleanInput)


function searchImagesOnBtnClick(evt) {
      evt.preventDefault();
    
    const searchValue = refs.input.value;     
       
 if (evt.target.className === ('search-form')) {
        page = 1;
        return searchImages(searchValue.trim(), page)
            .then(data => createFirstListMarkup(data))
            .catch(error => console.log(error));
    }

    else if (evt.target.className === ('loadMoreBtn button')) {
        page += 1;
        return searchImages(searchValue.trim(), page)
            .then(data => createNextListMarkup(data))
            .catch(error => console.log(error));
    
    } 
 else if (searchImages(searchValue.trim(), page).then(result => result.hits.length === 0))
        {
            refs.input.value = '';
            return;
}
            }
    

function createFirstListMarkup(data) {
    createList();
    createListItems(data);
    createBtn();
    scrolling();

    return;
};
function createNextListMarkup(data) {
    createListItems(data);
    scrolling();
};
//создает ul
function createList() {
  const list = document.createElement('ul');
  list.classList.add('gallery');
  refs.container.insertAdjacentElement('beforeend', list);
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
  if (refs.input.value === '') {
      page = 1;
      btn = document.querySelector('.loadMoreBtn')
    btn.remove();
    upBtn = document.querySelector('.upBtn');
    upBtn.remove();
    const list = document.querySelector('ul');
    list.remove();
    return;
  }
}





//