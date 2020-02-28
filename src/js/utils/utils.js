import {
  emptyResaltText,
  errorResultText,
  noResults,
  noResultsText,
  noResultsTitle,
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
  if (flag) {
    noResultsTitle.classList.add('no-results__title_is-opened');
    noResults.classList.add('no-results_is-opened');
    noResultsText.textContent = '';
    noResultsText.textContent = emptyResaltText;
  } else {
    noResultsTitle.classList.remove('no-results__title_is-opened');
    noResults.classList.remove('no-results_is-opened');
    noResultsText.textContent = '';
  }
}

// отображает результат, если от сервера пришла ошибка
function errorResults(flag) {
  if (flag) {
    noResultsTitle.classList.remove('no-results__title_is-opened');
    noResults.classList.add('no-results_is-opened');
    noResultsText.textContent = '';
    noResultsText.textContent = errorResultText;
  } else {
    noResultsTitle.classList.add('no-results__title_is-opened');
    noResults.classList.remove('no-results_is-opened');
    noResultsText.textContent = '';
  }
}

function removeAllChild(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}


export {
  getUser,
  deleteUser,
  preloader,
  emptyResults,
  errorResults,
  removeAllChild,
};
