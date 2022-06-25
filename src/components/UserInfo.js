export default class UserInfo {
    constructor(userData, profileSelector) {
        this._profile = document.querySelector(profileSelector);

        this._profileName = this._profile.querySelector(userData.userNameSelector);
        this._profileJob = this._profile.querySelector(userData.userJobSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            job: this._profileJob.textContent,
        };
    }

    setUserInfo(userName, userJob) {
        this._profileName.textContent = userName;
        this._profileJob.textContent = userJob;
    }
}