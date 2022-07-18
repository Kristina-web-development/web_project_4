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

// import Popup from "./Popup";

// export default class PopupWithConfirmation extends Popup {
//     constructor(popupSelector) {
//         super(popupSelector);
//         this._form = this._popupElement.querySelector(".form");
//         this._submitButton = this._form.querySelector("button");
//         this._buttonText = this._submitButton.textContent;
//     }

//     setAction(action) {
//         this._handleSubmit = action;
//     }

//     setEventListeners() {
//         this._form.addEventListener("submit", (evt) => {
//             evt.preventDefault();
//             this._handleSubmit();
//             super.close();
//         });

//         super.setEventListeners();
//     }

//     renderLoading(isLoading) {
//         if (isLoading) {
//             this._submitButton.textContent = "Deleting...";
//         } else {
//             this._submitButton.textContent = this._buttonText;
//         }
//     }
// }