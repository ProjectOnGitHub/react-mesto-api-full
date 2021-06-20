import baseUrl from './utils';

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: "include",

    })
      .then(this._getResponse)
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      credentials: "include",

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
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: "include",

    })
      .then(this._getResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: "include",

    })
      .then(this._getResponse)
  }

  changeUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      credentials: "include",

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
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      credentials: "include",

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
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      credentials: "include",

    })
      .then(this._getResponse)
  }

}
const api = new Api({
  baseUrl,
});

export default api;