class FormValidator {
    constructor(settings, formElement) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;

        this._element = formElement;
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._element.querySelector(
            `.${inputElement.id}-error`
        );

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._element.querySelector(
            `.${inputElement.id}-error`
        );

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    };

    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState = () => {
        const inputList = Array.from(
            this._element.querySelectorAll(this._inputSelector)
        );
        const buttonElement = this._element.querySelector(
            this._submitButtonSelector
        );
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute("disabled", "");
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
        }
    };

    _setEventListeners = () => {
        const inputList = Array.from(
            this._element.querySelectorAll(this._inputSelector)
        );

        this._toggleButtonState();

        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    };

    enableValidation = () => {
        this._element.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        this._setEventListeners();
    };
}

export { FormValidator };