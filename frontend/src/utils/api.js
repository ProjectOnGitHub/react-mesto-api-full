class Api {
  constructor({ baseUrl, token, cohortId }) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._cohortId = cohortId;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/${this._cohortId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._getResponse)
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/${this._cohortId}/cards`, {
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
    return fetch(`${this._baseUrl}/${this._cohortId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then(this._getResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/${this._cohortId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._getResponse)
  }

  changeUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/${this._cohortId}/users/me`, {
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
    return fetch(`${this._baseUrl}/${this._cohortId}/users/me/avatar`, {
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
    return fetch(`${this._baseUrl}/${this._cohortId}/cards/likes/${id}`, {
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
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  cohortId: 'cohort-21',
  token: '5391666e-5e33-4f71-9923-de80d868b155',
});

export default api;