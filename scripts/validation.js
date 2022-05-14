const configurations = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_visible",
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(settings.errorClass);
};

const isValid = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            settings
        );
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.setAttribute("disabled", "");
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    }
};

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(
        formElement.querySelectorAll(settings.inputSelector)
    );
    const buttonElement = formElement.querySelector(
        settings.submitButtonSelector
    );

    toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            isValid(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, settings);
    });
};

enableValidation(configurations);