class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(this._getResponse)
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._getResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then(this._getResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(this._getResponse)
  }

  changeUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._getResponse)
  }

  changeUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._getResponse)
  }


  changeLikeCardStatus(id, like) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
      .then(this._getResponse)
  }

}

const api = new Api({
  //baseUrl: 'https://api-mesto.praktikum.space',
  baseUrl: 'http://localhost:3003',
  token: `Bearer ${localStorage.getItem('jwt')}`,
});

export default api;