export default class HeaderMini {
  constructor(domElement) {
    this.domElement = domElement;
    this.render = this.render.bind(this);
    this.savedMessages = this.domElement
      .querySelector('.header-mini__saved-massages');
    this.logout = this.domElement
      .querySelector('.header-mini__logout');
    this.userName = this.domElement
      .querySelector('.header-mini__user-name');
    this.login = this.domElement
      .querySelector('.header-mini__login');
  }

  // рендерит шапку
  render(isLoggedIn, userName) {
    if (isLoggedIn) {
      this.savedMessages
        .classList.add('header-mini__saved-massages_is-opened');
      this.logout
        .classList.add('header-mini__logout_is-opened');
      this.userName
        .textContent = userName;
      this.login
        .classList.remove('header-mini__login_is-opened');
    } else {
      this.savedMessages
        .classList.remove('header-mini__saved-massages_is-opened');
      this.logout
        .classList.remove('header-mini__logout_is-opened');
      this.userName
        .textContent = '';
      this.login
        .classList.add('header-mini__login_is-opened');
    }
  }
}
