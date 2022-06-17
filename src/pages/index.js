import "./index.css";
import { Card } from "../components/Card.js";

import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import { PopupWithImage } from "../components/PopupWithImage";

const initialCards = [{
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg",
    },
];

(function() {
    const configurations = {
        formSelector: ".form",
        inputSelector: ".form__input",
        submitButtonSelector: ".form__button",
        inactiveButtonClass: "form__button_disabled",
        inputErrorClass: "form__input_type_error",
        errorClass: "form__input-error_visible",
    };

    const userInfo = new UserInfo({
            userNameSelector: ".profile__name",
            userJobSelector: ".profile__description",
        },
        ".profile__info"
    );

    const profilePopupOpenButton = document.querySelector(
        ".profile__open-button"
    );
    const galleryCardTemplateSelector = "#galleryCard";

    const cardsWrap = document.querySelector(".gallery__container");

    const handleNewPlaceFormSubmit = (data) => {
        renderCard({
                name: data["cardTitle"],
                link: data["cardLink"],
            },
            cardsWrap
        );
        newPlacePopup.close();
    };

    const handleProfileFormSubmit = (data) => {
        const nameInput = document.getElementById("name");
        const jobInput = document.getElementById("job");

        userInfo.setUserInfo(nameInput.value, jobInput.value);
        profilePopup.close();
    };

    const newPlacePopup = new PopupWithForm(
        "#newPlacePopup",
        handleNewPlaceFormSubmit,
        configurations
    );
    const profilePopup = new PopupWithForm(
        "#profilePopup",
        handleProfileFormSubmit,
        configurations
    );
    const bigPicturePopup = new PopupWithImage("#bigPicturePopup");

    bigPicturePopup.setEventListeners();
    newPlacePopup.setEventListeners();
    profilePopup.setEventListeners();

    newPlaceButton.addEventListener("click", () => newPlacePopup.open());
    profilePopupOpenButton.addEventListener("click", () => profilePopup.open());

    const renderCard = (cardData) => {
        const card = new Card(
            cardData,
            galleryCardTemplateSelector,
            (name, link) => {
                bigPicturePopup.open(name, link);
            }
        );

        section.addItem(card.generateCard());
    };

    const section = new Section({
            items: initialCards,
            renderer: renderCard,
        },
        ".gallery__container"
    );

    section.renderItems();
})();