export default class HeaderMini {
  constructor(domElement) {
    this.domElement = domElement;
  }

  // рендерит шапку
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
