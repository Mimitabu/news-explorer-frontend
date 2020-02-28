import {
  emptyResaltText,
  errorResultText,
} from '../constants/constants';

// возвращает текущего юзера из localStorage
function getUser(item) {
  return JSON.parse(localStorage.getItem(item));
}

// удаляет текущего юзера из localStorage
function deleteUser(item) {
  localStorage.removeItem(item);
}

// прелоудер
function preloader(flag) {
  const newsSearch = document.querySelector('.news-search');
  if (flag) {
    newsSearch.classList.add('news-search_is-opened');
  } else {
    newsSearch.classList.remove('news-search_is-opened');
  }
}

// отображает пустой результат
function emptyResults(flag) {
  const noResults = document.querySelector('.no-results');
  const erorrText = document.querySelector('.no-results__text');
  const title = document.querySelector('.no-results__title');
  if (flag) {
    title.classList.add('no-results__title_is-opened');
    noResults.classList.add('no-results_is-opened');
    erorrText.textContent = '';
    erorrText.textContent = emptyResaltText;
  } else {
    title.classList.remove('no-results__title_is-opened');
    noResults.classList.remove('no-results_is-opened');
    erorrText.textContent = '';
  }
}

// отображает результат, если от сервера пришла ошибка
function errorResults(flag) {
  const noResults = document.querySelector('.no-results');
  const erorrText = document.querySelector('.no-results__text');
  const title = document.querySelector('.no-results__title');
  if (flag) {
    title.classList.remove('no-results__title_is-opened');
    noResults.classList.add('no-results_is-opened');
    erorrText.textContent = '';
    erorrText.textContent = errorResultText;
  } else {
    title.classList.add('no-results__title_is-opened');
    noResults.classList.remove('no-results_is-opened');
    erorrText.textContent = '';
  }
}


export {
  getUser,
  deleteUser,
  preloader,
  emptyResults,
  errorResults,
};
