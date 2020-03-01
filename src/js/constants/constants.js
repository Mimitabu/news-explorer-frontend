import Button from '../components/Button';
import MainApi from '../api/MainApi';
import NewsApi from '../api/NewsApi';
import Header from '../components/Header';
import HeaderMini from '../components/HeaderMini';
import link from '../../images/save_icon_normal.svg';

// кнопки закрытия трех попапов
const closePopupButonIn = new Button(document.querySelector('.popup__close_signin'));
const closePopupButonUp = new Button(document.querySelector('.popup__close_signup'));
const closePopupButonSaccsess = new Button(document.querySelector('.popup__close_successful-signup'));

// кнопки переключения между попапами
const signupButton = new Button(document.querySelector('.popup__link-signup'));
const signinButton = new Button(document.querySelector('.popup__link-signin'));
const afterSignupButton = new Button(document.querySelector('.popup__sign-in'));

// кнопки Зарегистрироваться и Войти, которые отпраляют данные формы на сервер
const popupButtonSignup = new Button(document.querySelector('.popup__button_signup'));
const popupButtonSignin = new Button(document.querySelector('.popup__button_signin'));

// кнопки login и logout
const loginButton = new Button(document.querySelector('.header__login'));
const loginMiniButton = new Button(document.querySelector('.header-mini__login'));
const logoutButton = new Button(document.querySelector('.header__logout'));
const logoutMiniButton = new Button(document.querySelector('.header-mini__logout'));

// кнопка открытия/закрытия header-mini
const headerMiniOpenButton = new Button(document.querySelector('.header__hide-nav'));
const headerMiniCloseButton = new Button(document.querySelector('.header-mini__hide-nav'));

// шапка приложения в 2-х состояниях
const header = new Header(document.querySelector('.header'));
const headerMini = new HeaderMini(document.querySelector('.header-mini'));

// API пользователей
const mainURL = 'http://api.news-explorer.pw';
const mainApi = new MainApi(mainURL);

// API новостей
const newsURL = 'http://newsapi.org/v2/everything?';
const apiKey = '07180a3ab8d04f088f048cab429a6b29';
const newsApi = new NewsApi(newsURL, apiKey);

// Кнопка Показать еще
const showMoreButton = document.querySelector('.results__more-button');

// счетчик, сколько статей выводить за раз в Результатах поиска
const maxCount = 3;

// блок поиска и список поиска
const results = document.querySelector('.results');
const resultsList = document.querySelector('.results__list');

// тексты ошибок при рендере карточек
const emptyResaltText = 'К сожалению по вашему запросу ничего не найдено';
const errorResultText = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

// блок no-resalts
const noResults = document.querySelector('.no-results');
const noResultsText = document.querySelector('.no-results__text');
const noResultsTitle = document.querySelector('.no-results__title');

const searchForm = document.forms.search;



export {
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
  link,
  showMoreButton,
  maxCount,
  results,
  resultsList,
  emptyResaltText,
  errorResultText,
  noResults,
  noResultsText,
  noResultsTitle,
  searchForm,
};
