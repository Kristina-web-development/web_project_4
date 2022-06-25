import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popupElement.querySelector(".form");
        this._submitButton = this._form.querySelector("button");
        this._inputs = [...this._form.querySelectorAll(".form__input")];
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

    // setInputValues(data) {
    //     this._inputs.forEach(input => {
    //         input.value = data[input.name];
    //     })
    // }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            const valuesFromForm = this._getInputValues();

            this._submitHandler(valuesFromForm);
        });
    }
    close() {
        super.close();
        this._form.reset();
    }
    open() {
        super.open();
    }
}