import {
    closePopup,
    disableButton,
    clickClosePopup,
    openNewPlacePopup,
    openProfilePopup,
} from "./utils.js";
import { Card, initialCards } from "./Card.js";
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

    const nameInput = document.getElementById("name");
    const jobInput = document.getElementById("job");

    const galleryContainer = document.querySelector(".gallery__container");
    const activeValidators = [];

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

    function addCardToGallery(cardElement) {
        galleryContainer.prepend(cardElement);
    }

    function setProfileFormValues() {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
    }

    function handleProfileFormSubmit(evt) {
        evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;

        disableButton(profilePopupSubmitButton);
        closePopup(profilePopup);
    }

    function handleNewPlaceFormSubmit(e) {
        e.preventDefault();
        const newCardTitle = newPlaceForm.cardTitle.value;
        const newCardLink = newPlaceForm.cardLink.value;

        const newCard = new Card({ name: newCardTitle, link: newCardLink },
            "#galleryCard"
        ).generateCard();
        addCardToGallery(newCard);
        newPlaceForm.reset();
        disableButton(newPlaceSubmitButton);
        closePopup(newPlacePopup);
    }

    profilePopupOpenButton.addEventListener("click", openProfilePopup);
    profilePopupForm.addEventListener("submit", handleProfileFormSubmit);

    newPlaceButton.addEventListener("click", openNewPlacePopup);
    newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);

    newPlacePopup.addEventListener("click", clickClosePopup);
    profilePopup.addEventListener("click", clickClosePopup);
    bigPicturePopup.addEventListener("click", clickClosePopup);

    for (const card of initialCards.reverse()) {
        const _newCard = new Card({ name: card.name, link: card.link },
            "#galleryCard"
        ).generateCard();
        addCardToGallery(_newCard);
    }

    for (const formElement of[newPlaceForm, profilePopupForm]) {
        activeValidators.push(
            new FormValidator(configurations, formElement).enableValidation()
        );
    }

    const closeButtons = document.querySelectorAll(".popup__close-button");

    closeButtons.forEach((button) => {
        const popup = button.closest(".popup");

        button.addEventListener("click", () => closePopup(popup));
    });
})();