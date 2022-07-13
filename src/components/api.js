export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        }).then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    }


    addUserAvatar(inputValues) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: inputValues.avatarLink,
            }),
        });
    }

    addUserInfo(inputValues) {
        return fetch(this._baseUrl + '/users/me', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: inputValues.name,
                about: inputValues.job,
            }),
        }).then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    }

    getCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers
        }).then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    }

    addCard(inputValues) {
        return fetch(this._baseUrl + '/cards', {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: inputValues.title,
                link: inputValues.image,
            }),
        }).then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    }

    deleteCard(id) {
        return fetch(this._baseUrl + '/cards/' + id, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    addLikeCard(id) {
        return fetch(this._baseUrl + '/cards/likes/' + id, {
            method: "PUT",
            headers: this._headers,
        }).then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    }

    removeLikeCard(id) {
        return fetch(this._baseUrl + '/cards/likes/' + id, {
            method: "DELETE",
            headers: this._headers,
        }).then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    }

}