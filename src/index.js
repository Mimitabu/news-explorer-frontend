import './style.css';

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
} from './js/constants/constants';

import {
  deleteUser,
} from './js/utils/utils';

newsApi.getNews('Помидор')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

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
