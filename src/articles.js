import './style.css';
import SaveCard from './js/components/SaveCard';
import NewsCardList from './js/components/NewsCardList';

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
  resultsList,
  mainApi,
  favoritesUserName,
  favoritesKeyWords,
  favoritesGlobalCount,
  favoritesDifferent,
  favoritesWords,
  favoritesOthers,
  favoritesOthersCount,
  NO,
  SAVE_ONE,
  SAVE_TWO,
  SAVE_THREE,
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
    } else {
      results.classList.add('results_is-opened');
      const cardElementArray = [];
      initialCards.forEach((item) => {
        const { cardElement } = new SaveCard(item);
        cardElementArray.push(cardElement);
        const cardList = new NewsCardList(resultsList, cardElementArray);
        cardList.renderResults();
      });
    }
  }

  const objKeys = {};
  const sortKeys = {};

  function putKeys(data) {
    data.forEach((item) => {
      if (!objKeys.hasOwnProperty(item.keyword)) {
        objKeys[item.keyword] = 1;
      } else {
        objKeys[item.keyword] += 1;
      }
      return objKeys;
    });
  }

  function sort(obj) {
    Object.keys(obj).sort(function (a, b) {
      return obj[b] - obj[a];
    }).forEach(function (v) { sortKeys[v] = obj[v]; });
  }


  function renerCase(array) {
    if (array.length === 1) {
      favoritesDifferent.textContent = SAVE_ONE;
    } else if (array.length === 2 || array.length === 3
      || array.length === 4) {
      favoritesDifferent.textContent = SAVE_TWO;
    } else if (array.length > 5 || array.length === 0) {
      favoritesDifferent.textContent = SAVE_THREE;
    }
  }


  function renderTextBlock(array, obj) {
    favoritesUserName.textContent = getCurrentUser();
    if (Object.keys(obj).length === 0) {
      favoritesGlobalCount.textContent = NO;
      // favoritesDifferent.textContent = SAVE_THREE;
      favoritesKeyWords.textContent = '';
    } else if (Object.keys(obj).length === 1) {
      favoritesGlobalCount.textContent = array.length;
      // favoritesDifferent.textContent = SAVE_ONE;
      favoritesWords.textContent = Object.keys(obj);
      favoritesOthers.textContent = '';
      favoritesOthersCount.textContent = '';
    } else if (Object.keys(obj).length === 2) {
      favoritesGlobalCount.textContent = array.length;
      // favoritesDifferent.textContent = SAVE_TWO;
      favoritesWords.textContent = `${Object.keys(obj)[0]}, ${Object.keys(obj)[1]}`;
      favoritesOthers.textContent = '';
      favoritesOthersCount.textContent = '';
    } else if (Object.keys(obj).length === 3) {
      favoritesGlobalCount.textContent = array.length;
      // favoritesDifferent.textContent = SAVE_TWO;
      favoritesWords.textContent = `${Object.keys(obj)[0]}, ${Object.keys(obj)[1]}, ${Object.keys(obj)[2]}`;
      favoritesOthers.textContent = '';
      favoritesOthersCount.textContent = '';
    } else if (Object.keys(obj).length === 4) {
      favoritesGlobalCount.textContent = array.length;
      // favoritesKeyWords.textContent = 'По ключевым словам: ';
      // favoritesDifferent.textContent = SAVE_TWO;
      favoritesWords.textContent = `${Object.keys(obj)[0]}, ${Object.keys(obj)[1]}`;
      favoritesOthersCount.textContent = `и ${(Object.keys(obj).length - 2)} другим`;
    } else if (Object.keys(obj).length > 4) {
      favoritesGlobalCount.textContent = array.length;
      // favoritesKeyWords.textContent = 'По ключевым словам: ';
      // favoritesDifferent.textContent = SAVE_THREE;
      favoritesWords.textContent = `${Object.keys(obj)[0]}, ${Object.keys(obj)[1]}`;
      favoritesOthersCount.textContent = `и ${(Object.keys(obj).length - 2)} другим`;
      // favoritesWords.textContent = 'dskfhdsjkhd';
    }
  }

  mainApi.getArticles()
    .then((data) => {
      const array = data.data;
      cardRender(array);
      putKeys(array);
      sort(objKeys);
      renerCase(array);
      renderTextBlock(array, sortKeys);
      console.log('objKeys', objKeys);
      console.log('sortKeys', sortKeys);
      console.log('length,', (array.length));
      console.log(Object.keys(sortKeys)[0]);
    })
    .catch((err) => {
      console.log(err);
    });






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
