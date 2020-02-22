import Popup from '../components/Popup';
import Button from '../components/Button';
import Form from '../components/Form';
import FormExtend from '../components/FormExtend';
import MainApi from '../api/MainApi';
import Header from '../components/Header';
import HeaderMini from '../components/HeaderMini';

// кнопки закрытия трех попапов
const closePopupButonIn = new Button(document.querySelector('.popup__close_signin'));
const closePopupButonUp = new Button(document.querySelector('.popup__close_signup'));
const closePopupButonSaccsess = new Button(document.querySelector('.popup__close_successful-signup'));

// кнопки переключения между попапами
const loginButton = new Button(document.querySelector('.header__login'));
const signupButton = new Button(document.querySelector('.popup__link-signup'));
const signinButton = new Button(document.querySelector('.popup__link-signin'));
const afterSignupButton = new Button(document.querySelector('.popup__sign-in'));

// кнопки Зарегистрироваться и Войти, которые отпраляют данные формы на сервер
const popupButtonSignup = new Button(document.querySelector('.popup__button_signup'));
const popupButtonSignin = new Button(document.querySelector('.popup__button_signin'));

// попап и форма регистрации
const popup = new Popup(document.querySelector('.popup'));
const formSignin = new Form(document.forms.signin);
const formSignup = new FormExtend(document.forms.signup);

// шапка приложения в 2-х состояниях
const header = new Header(document.querySelector('.header'));
const headerMini = new HeaderMini(document.querySelector('.header-mini'));

// API пользователей
const mainURL = 'http://api.news-explorer.pw';
const mainApi = new MainApi(mainURL);


export {
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
};
