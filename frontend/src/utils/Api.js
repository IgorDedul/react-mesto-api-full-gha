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

    // Приватный метод включения токена авторизации в заголовок
    _getHeaders() {
      const token = localStorage.getItem('token');
  
      return {
        'Authorization': `Bearer ${token}`,
        ...this._headers,
      };
    }
  
    // Метод загрузки карточек с сервера
    getInitialCards() {
      return fetch(`${this._link}/cards`, {
        headers: this._getHeaders(),
        method: 'GET'
      })
        .then(res => this._parseResponse(res));
    }
  
    // Метод добавления карточки на сервер
    addCard(data) {
      return fetch(`${this._link}/cards`, {
        method: 'POST',
        headers: this._getHeaders(),
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
        headers: this._getHeaders()
      })
        .then(res => this._parseResponse(res));
    }
  
    // Метод добавления лайка на сервер
    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
        method: `${!isLiked ? 'DELETE' : 'PUT'}`,
        headers: this._getHeaders()
      })
        .then(res => this._parseResponse(res));
    }
  
    // Метод получения данных пользователя с сервера
    getUserInfo() {
      return fetch(`${this._link}/users/me`, {
        headers: this._getHeaders(),
        method: 'GET'
      })
        .then(res => this._parseResponse(res));
    }
  
    // Метод отправки данных пользователя на сервер
    setUserInfo(data) {
      return fetch(`${this._link}/users/me`, {
        method: 'PATCH',
        headers: this._getHeaders(),
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
        headers: this._getHeaders(),
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
        .then(res => this._parseResponse(res));
    }
  }
  
  const api = new Api({
    link: 'https://api.igord.nomoredomainsicu.ru',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  export default api;