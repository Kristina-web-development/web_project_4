const configurations = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_visible",
};

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(configurations.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(configurations.errorClass);
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(configurations.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(configurations.errorClass);
}

const isValid = (formElement, inputElement) => {
    console.log(inputElement.validity);
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("form__button_disabled");
        buttonElement.setAttribute("disabled", "");
    } else {
        buttonElement.classList.remove("form__button_disabled");
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
    //buttonElement.classList.add("popup__button_inactive");
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (settings) => {
    console.log("Validation enabled");
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();

        });

        setEventListeners(formElement, settings);
    });
};

enableValidation(configurations);