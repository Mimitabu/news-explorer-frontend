import './style.css';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import Popup from './js/components/Popup';
import SigninForm from './js/components/SigninForm';
import SignupForm from './js/components/SignupForm';

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
  NOT_UNIQUE_USER,
  WRONG,
  NOT_REGISTERED,
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
const formSignin = new SigninForm(document.forms.signin);
const formSignup = new SignupForm(document.forms.signup);


// пустой массив и счетчик, нужные для работы moreResults()
let cardElementArray = [];
let from = 0;

// рендер карточек, в т.ч. по кнопке Показать ещe
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

// рендер карточек и ошибок
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
      const dataArticles = data.articles;
      if (dataArticles.length === 0) {
        showMoreButton.classList.remove('results__more-button_is-opened');
        emptyResults(true);
      } else {
        if (dataArticles.length <= 3) {
          showMoreButton.classList.remove('results__more-button_is-opened');
        } else {
          showMoreButton.classList.add('results__more-button_is-opened');
        }
        dataArticles.forEach((item) => {
          const { cardElement } = new NewsCard(item, searchInput.value);
          cardElementArray.push(cardElement);
          results.classList.add('results_is-opened');
        });
      }
      preloader(false);
      moreResults();
      return cardElementArray;
    })
    .catch(() => {
      errorResults(true);
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
  formSignin.clear();
  formSignin.clearErrors();
  formSignup.clear();
  formSignup.clearErrors();
}

// регистрация пользователя
function signup(event) {
  event.preventDefault();
  const email = document.forms.signup.elements.email.value;
  const password = document.forms.signup.elements.password.value;
  const name = document.forms.signup.elements.name.value;
  mainApi.signup(email, password, name)
    .then(() => {
      openFormSuccessSignup();
    })
    .catch((err) => {
      if (err === 'Bad Request') {
        formSignup.setServerError(NOT_UNIQUE_USER);
      }
    });
}

// вход пользователя
function signin(event) {
  event.preventDefault();
  const email = document.forms.signin.elements.email.value;
  const password = document.forms.signin.elements.password.value;
  mainApi.signin(email, password)
    .then((data) => {
      header.render(true, data.name);
      headerMini.render(true, data.name);
      closeForm();
      document.location.reload();
    })
    .catch((err) => {
      if (err === 'Unauthorized') {
        formSignin.setServerError(WRONG);
      } else {
        formSignin.setServerError(NOT_REGISTERED);
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
