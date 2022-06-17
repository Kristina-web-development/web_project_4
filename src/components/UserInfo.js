export default class UserInfo {
    constructor(userData, profileSelector) {
        this._profileSelector = document.querySelector(profileSelector);
        this._profileName = this._profileSelector.querySelector(userData.userNameSelector);
        this._profileJob = this._profileSelector.querySelector(userData.userJobSelector);
    }

    getuserInfo() {
        return { "name": this._profileName, "job": this._prfileJob };
    }

    setUserInfo(userName, userJob) {
        this._profileName.textContent = userName;
        this._profileJob.textContent = userJob;
    }

}