import './style.css';

import {
  getProfile,
  deleteUser,
} from './js/utils/utils';

import {
  header,
  headerMini,
  headerMiniOpenButton,
  headerMiniCloseButton,
  logoutButton,
  logoutMiniButton,
  newsCardList,
  resultsList,
} from './js/constants/constants';

function start() {
  // получаем имя юзера из localstorage
  function getCurrentUser() {
    let currentUser = '';
    if (getProfile) {
      currentUser = getProfile.name;
    }
    return currentUser;
  }

  // рендерим header
  header.render(getProfile, getCurrentUser());
  headerMini.render(getProfile, getCurrentUser());

  // открытие HeaderMini
  function openHeaderMini() {
    const headerMiniDOM = document.querySelector('.header-mini');
    headerMiniDOM.classList.add('header-mini_is-opened');
  }

  // закрытие HeaderMini
  function closeHeaderMini() {
    const headerMiniDOM = document.querySelector('.header-mini');
    headerMiniDOM.classList.remove('header-mini_is-opened');
  }

  // выход из профиля
  function logout() {
    deleteUser('user');
    header.render(false, '');
    headerMini.render(false, '');
  }


  function cardRender(initialCards) {
    const results = document.querySelector('.results');
    if (initialCards.length === 0) {
      results.classList.remove('results_is-opened');
    }
  }

  function cardRender(event) {
    event.preventDefault();
    cardElementArray = [];
    from = 0;
    removeAllChild(resultsList);
    emptyResults(false);
    errorResults(false);
    preloader(true);
    newsApi.getNews(searchInput.value)
      .then((data) => {
        console.log(data);
        const dataArticles = data.articles;
        if (dataArticles.length === 0) {
          emptyResults(true);
        } else {
          dataArticles.forEach((item) => {
            const { cardElement } = new NewsCard(item, searchInput.value);
            // cardElement.activeIcon();
            cardElementArray.push(cardElement);
            results.classList.add('results_is-opened');
          });
        }
        preloader(false);
        moreResults();
        searchInput.value = '';
        console.log(cardElementArray);
        return cardElementArray;
      })
      .catch((err) => {
        errorResults(true);
        console.log(err);
      })
      .finally(() => {
        preloader(false);
      });
}


  headerMiniOpenButton.addEventListener('click', openHeaderMini);
  headerMiniCloseButton.addEventListener('click', closeHeaderMini);
  logoutButton.addEventListener('click', logout);
  logoutMiniButton.addEventListener('click', logout);
}

if (getProfile) {
  start();
} else {
  window.location.href = 'index.html';
}

console.log('working');
