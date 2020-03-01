import './style.css';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import FormExtend from './js/components/FormExtend';

import {
  closePopupButonIn,
  closePopupButonUp,
  closePopupButonSaccsess,
  loginButton,
  signupButton,
  signinButton,
  mainApi,
  popupButtonSignup,
  popupButtonSignin,
  afterSignupButton,
  header,
  headerMini,
  loginMiniButton,
  logoutButton,
  logoutMiniButton,
  headerMiniOpenButton,
  headerMiniCloseButton,
  newsApi,
  showMoreButton,
  maxCount,
  results,
  resultsList,
  searchForm,
} from './js/constants/constants';


import {
  getProfile,
  deleteUser,
  preloader,
  emptyResults,
  errorResults,
  removeAllChild,
} from './js/utils/utils';

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

// попап и форма регистрации
const popup = new Popup(document.querySelector('.popup'));
const formSignin = new Form(document.forms.signin);
const formSignup = new FormExtend(document.forms.signup);


const formDOMSignin = document.forms.signin;
const formDOMSignup = document.forms.signup;

let cardElementArray = [];
let from = 0;
function moreResults() {
  let until = from + maxCount;
  if (until > cardElementArray.length) {
    until = cardElementArray.length;
    showMoreButton.classList.remove('results__more-button_is-opened');
  }
  const sliceRenderArray = cardElementArray.slice(from, until);
  const cardList = new NewsCardList(resultsList, sliceRenderArray);
  cardList.renderResults();
  from = until;
  return from;
}


function cardRender(event) {
  event.preventDefault();
  cardElementArray = [];
  from = 0;
  removeAllChild(resultsList);
  emptyResults(false);
  errorResults(false);
  const searchInput = document.forms.search.elements.keyword;
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

// открытие попапа входа
function openFormSignin() {
  popup.open();
  popup.clearContent('.popup__content-signup');
  popup.clearContent('.popup__content_successful-signup');
  popup.setContent('.popup__content-signin');
  closeHeaderMini();
}

// открытие попапа регистрации
function openFormSignup() {
  popup.clearContent('.popup__content-signin');
  popup.setContent('.popup__content-signup');
}

// открытие попапа успешной регистрации
function openFormSuccessSignup() {
  popup.clearContent('.popup__content-signup');
  popup.setContent('.popup__content_successful-signup');
}

// закрытие попапа
function closeForm() {
  popup.close();
}

// регистрация пользователя
function signup(event) {
  event.preventDefault();
  const email = formDOMSignup.elements.email.value;
  const password = formDOMSignup.elements.password.value;
  const name = formDOMSignup.elements.name.value;
  mainApi.signup(email, password, name)
    .then(() => {
      openFormSuccessSignup();
    })
    .catch((err) => {
      if (err === 'Bad Request') {
        formSignup.setServerError('Такой пользователь уже существует');
      }
    });
}

// вход пользователя
function signin(event) {
  event.preventDefault();
  const email = formDOMSignin.elements.email.value;
  const password = formDOMSignin.elements.password.value;
  mainApi.signin(email, password)
    .then((data) => {
      header.render(true, data.name);
      headerMini.render(true, data.name);
      closeForm();
      document.location.reload();
      // removeAllChild(resultsList);
      // moreResults();
    })
    .catch((err) => {
      if (err === 'Unauthorized') {
        formSignin.setServerError('Неверный логин или пароль');
      } else {
        formSignin.setServerError('Пользователь не зарегистрирован');
      }
    });
}

// выход из профиля
function logout() {
  deleteUser('user');
  header.render(false, '');
  headerMini.render(false, '');
}








// слушатели событий
loginButton.addEventListener('click', openFormSignin);
loginMiniButton.addEventListener('click', openFormSignin);
closePopupButonIn.addEventListener('click', closeForm);
closePopupButonUp.addEventListener('click', closeForm);
closePopupButonSaccsess.addEventListener('click', closeForm);
signupButton.addEventListener('click', openFormSignup);
signinButton.addEventListener('click', openFormSignin);
popupButtonSignup.addEventListener('click', signup);
afterSignupButton.addEventListener('click', openFormSignin);
popupButtonSignin.addEventListener('click', signin);
logoutButton.addEventListener('click', logout);
logoutMiniButton.addEventListener('click', logout);
headerMiniOpenButton.addEventListener('click', openHeaderMini);
headerMiniCloseButton.addEventListener('click', closeHeaderMini);
searchForm.addEventListener('submit', cardRender);
showMoreButton.addEventListener('click', moreResults);
