class FormValidator {
    constructor(settings, formElement) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;

        this._element = formElement;

        this._inputList = Array.from(
            this._element.querySelectorAll(this._inputSelector)
        );

        this._buttonElement = this._element.querySelector(
            this._submitButtonSelector
        );
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
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute("disabled", "");
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute("disabled");
        }
    };

    _setEventListeners = () => {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
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