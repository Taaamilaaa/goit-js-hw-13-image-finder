import { refs } from './js/refs';
import searchImages from './js/apiService';

refs.submitBtn.addEventListener('click', searchImages)
refs.input.addEventListener('input', cleanInput);


