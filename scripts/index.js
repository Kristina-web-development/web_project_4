import {
    closePopup,
    clickClosePopup,
    openNewPlacePopup,
    openProfilePopup,
    handleProfileFormSubmit,
    handleNewPlaceFormSubmit,
    addCardToGallery,
    initialCards,
} from "./utils.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

(function() {
    const configurations = {
        formSelector: ".form",
        inputSelector: ".form__input",
        submitButtonSelector: ".form__button",
        inactiveButtonClass: "form__button_disabled",
        inputErrorClass: "form__input_type_error",
        errorClass: "form__input-error_visible",
    };

    const galleryCardTemplateSelector = "#galleryCard";

    const bigPicturePopup = document.getElementById("bigPicturePopup");

    const profilePopup = document.getElementById("profilePopup");
    const profilePopupOpenButton = document.querySelector(
        ".profile__open-button"
    );

    const profilePopupForm = profilePopup.querySelector(".form");
    const profilePopupSubmitButton =
        profilePopupForm.querySelector(".form__button");

    const newPlacePopup = document.getElementById("newPlacePopup");

    const newPlaceForm = newPlacePopup.querySelector(".form");
    const newPlaceButton = document.getElementById("newPlaceButton");
    const newPlaceSubmitButton = document.querySelector(
        "form[id=newPlacePopupForm] button"
    );
    const profileName = document.querySelector(".profile__name");
    const profileJob = document.querySelector(".profile__description");

    profilePopupOpenButton.addEventListener("click", openProfilePopup);
    profilePopupForm.addEventListener("submit", () =>
        handleProfileFormSubmit(
            profileName,
            profileJob,
            profilePopup,
            profilePopupSubmitButton
        )
    );

    newPlaceButton.addEventListener("click", openNewPlacePopup);
    newPlaceForm.addEventListener("submit", () =>
        handleNewPlaceFormSubmit(
            newPlacePopup,
            newPlaceSubmitButton,
            newPlaceForm,
            galleryCardTemplateSelector
        )
    );

    newPlacePopup.addEventListener("click", clickClosePopup);
    profilePopup.addEventListener("click", clickClosePopup);
    bigPicturePopup.addEventListener("click", clickClosePopup);

    for (const card of initialCards.reverse()) {
        const _newCard = new Card({ name: card.name, link: card.link },
            galleryCardTemplateSelector
        ).generateCard();
        addCardToGallery(_newCard);
    }

    for (const formElement of[newPlaceForm, profilePopupForm]) {
        new FormValidator(configurations, formElement).enableValidation();
    }

    const closeButtons = document.querySelectorAll(".popup__close-button");

    closeButtons.forEach((button) => {
        const popup = button.closest(".popup");

        button.addEventListener("click", () => closePopup(popup));
    });
})();