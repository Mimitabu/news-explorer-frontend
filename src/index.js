import './style.css';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';

import {
  closePopupButonIn,
  closePopupButonUp,
  closePopupButonSaccsess,
  loginButton,
  signupButton,
  signinButton,
  popup,
  mainApi,
  formSignin,
  formSignup,
  popupButtonSignup,
  popupButtonSignin,
  afterSignupButton,
  header,
  headerMini,
  getProfile,
  loginMiniButton,
  logoutButton,
  logoutMiniButton,
  headerMiniOpenButton,
  headerMiniCloseButton,
  newsApi,
  searchButton,
  showMoreButton,
  // searchInput,
} from './js/constants/constants';


import {
  deleteUser,
} from './js/utils/utils';

// function firstRender() {
//   const cardElementArray = [];
//   newsApi.getNews('природа')
//     .then((data) => {
//       console.log(data);
//       const dataArticles = data.articles;
//       dataArticles.forEach((item) => {
//         const { cardElement } = new NewsCard(item, 'природа');
//         cardElementArray.push(cardElement);
//       });
//       const cardList = new NewsCardList(document.querySelector('.results__list'), cardElementArray);
//       cardList.renderResults();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// firstRender();

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


const formDOMSignin = document.forms.signin;
const formDOMSignup = document.forms.signup;

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

const cardElementArray = [];
let renderArray = [];
function cardRender(event) {
  event.preventDefault();
  // const cardElementArray = [];
  const searchInput = document.forms.search.elements.keyword;
  newsApi.getNews(searchInput.value)
    .then((data) => {
      const dataArticles = data.articles;
      dataArticles.forEach((item) => {
        const { cardElement } = new NewsCard(item, searchInput.value);
        cardElementArray.push(cardElement);
      });
      const partCardArray = cardElementArray.slice(0, 3);
      const cardList = new NewsCardList(document.querySelector('.results__list'), partCardArray);
      cardList.renderResults();
      searchInput.value = '';
      renderArray = cardElementArray.slice(3);
      return renderArray;
    })
    .catch((err) => {
      console.log(err);
    });
}

let from = 0;

function moreResults() {
  let until = from + 3;
  if (until > renderArray.length) {
    until = renderArray.length;
  }
  const sliceRenderArray = renderArray.slice(from, until);
  const cardList = new NewsCardList(document.querySelector('.results__list'), sliceRenderArray);
  cardList.renderResults();
  from = until;
  return from;
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
searchButton.addEventListener('click', cardRender);
showMoreButton.addEventListener('click', moreResults);
