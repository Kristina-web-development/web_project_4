export default class UserInfo {
    constructor(userData, profileSelector) {
        this._profile = document.querySelector(profileSelector);

        this._profileName = this._profile.querySelector(userData.userNameSelector);
        this._profileJob = this._profile.querySelector(userData.userJobSelector);
        this._profileAvatar = document.querySelector(userData.userAvatarSelector);
        this._profileId = ""
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            job: this._profileJob.textContent,
            avatar: this._profileAvatar.src,
            _id: this._profileId
        };
    }

    setUserInfo(userName, userJob, userId) {
        this._profileName.textContent = userName;
        this._profileJob.textContent = userJob;
        this._profileId = userId
    }

    setUserAvatar(userAvatar) {
        this._profileAvatar.setAttribute("src", userAvatar.avatarLink);
    }
}