import "./index.css";
import { Card } from "../components/Card.js";

import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator";
import { PopupWithImage } from "../components/PopupWithImage";
import {
    initialCards,
    configurations,
    newPlaceButton,
    profilePopupOpenButton,
    galleryCardTemplateSelector,
    cardsWrap,
    allForms,
} from "../utils/constants.js";

const createCard = (cardData) => {
    const _card = new Card(
        cardData,
        galleryCardTemplateSelector,
        (link, name) => {
            bigPicturePopup.open(link, name);
        }
    );
    return _card;
};

const userInfo = new UserInfo({
        userNameSelector: ".profile__name",
        userJobSelector: ".profile__description",
    },
    ".profile__info"
);

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
    userInfo.setUserInfo(data.name, data.job);
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
    const card = createCard(cardData);

    section.addItem(card.generateCard());
};

const section = new Section({
        items: initialCards,
        renderer: renderCard,
    },
    ".gallery__container"
);

section.renderItems();

allForms.forEach((form) => {
    new FormValidator(configurations, form).enableValidation();
});