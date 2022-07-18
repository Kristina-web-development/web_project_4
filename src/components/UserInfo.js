export default class UserInfo {
    constructor(userData, profileSelector) {
        this._profile = document.querySelector(profileSelector);

        this._profileName = this._profile.querySelector(userData.userNameSelector);
        this._profileJob = this._profile.querySelector(userData.userJobSelector);
        this._profileAvatar = document.querySelector(userData.userAvatarSelector);
        this._profileId = "";
    }

    getId() {
        return this._profileId;
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            job: this._profileJob.textContent,
            avatar: this._profileAvatar.src,
            _id: this._profileId,
        };
    }

    setUserInfo(userName, userJob, userId) {
        this._profileName.textContent = userName;
        this._profileJob.textContent = userJob;
        this._profileId = userId;
    }

    setUserAvatar(userAvatar) {
        this._profileAvatar.setAttribute("src", userAvatar.avatarLink);
    }
}

// export default class Api {
//     constructor({ baseUrl, headers }) {
//         this._baseUrl = baseUrl;
//         this._headers = headers;
//     }

//     _getResponseData(res) {
//         if (!res.ok) {
//             return Promise.reject(`Error: ${res.status}`);
//         }
//         return res.json();
//     }

//     getUserInfo() {
//         return fetch(this._baseUrl + "/users/me", {
//             headers: this._headers,
//         }).then(this._getResponseData);
//     }

//     addUserAvatar(data) {
//         return fetch(this._baseUrl + "/users/me/avatar", {
//             method: "PATCH",
//             headers: this._headers,
//             body: JSON.stringify({
//                 avatar: data.avatarLink,
//             }),
//         }).then(this._getResponseData);
//     }

//     addUserInfo(data) {
//         return fetch(this._baseUrl + "/users/me", {
//             method: "PATCH",
//             headers: this._headers,
//             body: JSON.stringify({
//                 name: data.name,
//                 about: data.job,
//             }),
//         }).then(this._getResponseData);
//     }

//     getCards() {
//         return fetch(this._baseUrl + "/cards", {
//             headers: this._headers,
//         }).then(this._getResponseData);
//     }

//     addCard(data) {
//         return fetch(this._baseUrl + "/cards", {
//             method: "POST",
//             headers: this._headers,
//             body: JSON.stringify({
//                 name: data.title,
//                 link: data.image,
//             }),
//         }).then(this._getResponseData);
//     }

//     deleteCard(id) {
//         return fetch(this._baseUrl + "/cards/" + id, {
//             method: "DELETE",
//             headers: this._headers,
//         }).then(this._getResponseData);
//     }

//     addLikeCard(id) {
//         return fetch(this._baseUrl + "/cards/likes/" + id, {
//             method: "PUT",
//             headers: this._headers,
//         }).then(this._getResponseData);
//     }

//     removeLikeCard(id) {
//         return fetch(this._baseUrl + "/cards/likes/" + id, {
//             method: "DELETE",
//             headers: this._headers,
//         }).then(this._getResponseData);
//     }
// }