export default class Header {
  constructor(domElement) {
    this.domElement = domElement;
    this.render = this.render.bind(this);
    this.savedMessages = this.domElement
      .querySelector('.header__saved-massages');
    this.logout = this.domElement
      .querySelector('.header__logout');
    this.userName = this.domElement
      .querySelector('.header__user-name');
    this.login = this.domElement
      .querySelector('.header__login');
  }

  // рендерит шапку
  render(isLoggedIn, userName) {
    if (isLoggedIn) {
      this.savedMessages
        .classList.add('header__saved-massages_is-open');
      this.logout
        .classList.add('header__logout_is-opened');
      this.userName
        .textContent = userName;
      this.login
        .classList.remove('header__login_is-opened');
    } else {
      this.savedMessages
        .classList.remove('header__saved-massages_is-open');
      this.logout
        .classList.remove('header__logout_is-opened');
      this.userName
        .textContent = '';
      this.login
        .classList.add('header__login_is-opened');
    }
  }
}
