import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popupElement.querySelector(".form");
        this._submitButton = this._form.querySelector("button");
        this._buttonText = this._submitButton.textContent;
    }

    setAction(action) {
        this._handleSubmit = action;
    }

    setEventListeners() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleSubmit();
            super.close();
        });

        super.setEventListeners();
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = "Deleting...";
        } else {
            this._submitButton.textContent = this._buttonText;
        }
    }
}