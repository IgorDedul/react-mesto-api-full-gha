class Api {
    constructor(options) {
      this._link = options.link;
      this._headers = options.headers;
    }
  
    // Приватный метод получения ответа сервера
    _parseResponse(res) {
      if (res.ok) {
        return res.json();
      } else {
      return Promise.reject(`код ошибки: ${res.status}`)
      }
    }
  
    // Метод загрузки карточек с сервера
    getInitialCards() {
      return fetch(`${this._link}/cards`, {
        headers: this._headers,
        method: 'GET'
      })
        .then(res => this._parseResponse(res));
    }
  
    // Метод добавления карточки на сервер
    addCard(data) {
      return fetch(`${this._link}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
        .then(res => this._parseResponse(res));
    }
  
    // Метод удаления карточки с сервера
    deleteCard(cardId) {
      return fetch(`${this._link}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
    // Метод добавления лайка на сервер
    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
        method: `${!isLiked ? 'DELETE' : 'PUT'}`,
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
    // Метод получения данных пользователя с сервера
    getUserInfo() {
      return fetch(`${this._link}/users/me`, {
        headers: this._headers,
        method: 'GET'
      })
        .then(res => this._parseResponse(res));
    }
  
    // Метод отправки данных пользователя на сервер
    setUserInfo(data) {
      return fetch(`${this._link}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
        .then(res => this._parseResponse(res));
    }
  
    // Метод отправки данных о новом аватаре на сервер
    setUserAvatar(data) {
      return fetch(`${this._link}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
        .then(res => this._parseResponse(res));
    }
  }
  
  const api = new Api({
    link: 'https://mesto.nomoreparties.co/v1/cohort-66/',
    headers: {
      authorization: '87e7fffd-44f4-496a-a376-493e7b9c6ebf',
      'Content-Type': 'application/json'
    }
  });
  
  export default api;