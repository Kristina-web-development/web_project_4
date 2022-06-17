import Popup from "./Popup.js"
import { FormValidator } from "./FormValidator.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler, settings) {
        super(popupSelector)
        this._settings = settings
        this._submitHandler = submitHandler;
        this._form = this._popupElement.querySelector('.form');
        this._submitButton = this._form.querySelector("button");

    }

    _disableButton() {
        this._submitButton.setAttribute("disabled", true);
        this._submitButton.classList.add("form__button_disabled");
    }

    _getInputValues() {
        const values = {}
        const inputs = [...this._form.querySelectorAll('.form__input')]

        inputs.forEach((input) => {
            const key = input.name
            const value = input.value

            values[key] = value
        })
        return values
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (e) => {
            e.preventDefault()
            const valuesFromForm = this._getInputValues()

            this._submitHandler(valuesFromForm)
        })
    }
    close() {
        this._disableButton()
        super.close()
        this._form.reset()
    }
    open() {
        new FormValidator(this._settings, this._form).enableValidation()
        super.open()
    }

}