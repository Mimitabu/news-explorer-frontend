export default class Header {
  constructor(domElement) {
    this.domElement = domElement;
  }

  render(isLoggedIn, userName) {
    if (isLoggedIn) {
      this.domElement
        .querySelector('.header__saved-massages')
        .classList.add('header__saved-massages_is-opened');
      this.domElement
        .querySelector('.header__logout')
        .classList.add('header__logout_is-opened');
      this.domElement
        .querySelector('.header__user-name')
        .textContent = userName;
      this.domElement
        .querySelector('.header__login')
        .classList.remove('header__login_is-opened');
    }
    this.domElement
      .querySelector('.header__saved-massages')
      .classList.remove('header__saved-massages_is-opened');
    this.domElement
      .querySelector('.header__logout')
      .classList.remove('header__logout_is-opened');
    this.domElement
      .querySelector('.header__user-name')
      .textContent = '';
    this.domElement
      .querySelector('.header__login')
      .classList.add('header__login_is-opened');
  }

  renderMini(isLoggedIn, userName) {
    if (isLoggedIn) {
      this.domElement
        .querySelector('header-mini__saved-massages')
        .classList.add('header-mini__saved-massages_is-opened');
      this.domElement
        .querySelector('.header-mini__logout')
        .classList.add('header-mini__logout_is-opened');
      this.domElement
        .querySelector('.header-mini__user-name')
        .textContent = userName;
      this.domElement
        .querySelector('.header-mini__login')
        .classList.remove('header-mini__login_is-opened');
    }
    this.domElement
      .querySelector('.header-mini__saved-massages')
      .classList.remove('header-mini__saved-massages_is-opened');
    this.domElement
      .querySelector('.header-mini__logout')
      .classList.remove('header-mini__logout_is-opened');
    this.domElement
      .querySelector('.header-mini__user-name')
      .textContent = '';
    this.domElement
      .querySelector('.header-mini__login')
      .classList.add('header-mini__login_is-opened');
  }
}
