import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popupElement.querySelector(".form");
        this._submitButton = this._form.querySelector("button");
        this._inputs = [...this._form.querySelectorAll(".form__input")];
        this._buttonText = this._submitButton.textContent;
    }

    _getInputValues() {
        const values = {};

        this._inputs.forEach((input) => {
            const key = input.name;
            const value = input.value;

            values[key] = value;
        });
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            const valuesFromForm = this._getInputValues();

            this._handleSubmit(valuesFromForm);
        });
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = "Saving...";
        } else {
            this._submitButton.textContent = this._buttonText;
        }
    }

    close() {
        super.close();
        this._form.reset();
    }
}