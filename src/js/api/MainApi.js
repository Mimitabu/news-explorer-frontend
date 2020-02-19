// класс для взаимодействия с news-explorer-api
export default class MainApi {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // регистрирует нового пользователя
  signup(userEmail, userPassword, userName) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        name: userName,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }

  // аутентифицирует пользователя на основе почты и пароля
  signin(userEmail, userPassword) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((data) => {
        // сохраняем токен
        localStorage.setItem('token', data.token);
      });
  }

  // возвращает информацию о пользователе
  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.regect(res.status);
      });
  }

  // забирает все статьи
  getArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.regect(res.status);
      });
  }

  // создаёт статью
  createArticle(userKeyword, userTitle, userText, userDate,
    userSource, userLink, userImage) {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      body: JSON.stringify({
        keyword: userKeyword,
        title: userTitle,
        text: userText,
        date: userDate,
        source: userSource,
        link: userLink,
        image: userImage,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }

  // удаляет статью
  removeArticle(articleId) {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.regect(res.status);
      });
  }
}
