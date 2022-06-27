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
    nameInput,
    jobInput,
    profilePopupForm,
    newPlaceForm,
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
    newPlaceFormValidator.resetValidation();
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

function infoForm(info) {
    nameInput.value = info.name;
    jobInput.value = info.job;
}

newPlaceButton.addEventListener("click", () => newPlacePopup.open());
//profilePopupOpenButton.addEventListener("click", () => profilePopup.open())

profilePopupOpenButton.addEventListener("click", () => {
    const formInputs = userInfo.getUserInfo();

    infoForm(formInputs);

    profilePopup.open();
});

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

// allForms.forEach((form) => {
//     new FormValidator(configurations, form).enableValidation();
// });

const profileFormValidator = new FormValidator(
    configurations,
    profilePopupForm
);
const newPlaceFormValidator = new FormValidator(configurations, newPlaceForm);

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();