export const initialCards = [{
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

export const configurations = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_visible",
};

export const avatarForm = document.querySelector(
    "form[name=avatarProfileForm]"
);
export const profilePopupForm = profilePopup.querySelector(".form");
export const newPlaceForm = newPlacePopup.querySelector(".form");
export const newPlaceButton = document.getElementById("newPlaceButton");

export const profilePopupOpenButton = document.querySelector(
    ".profile__open-button"
);
export const galleryCardTemplateSelector = "#galleryCard";

export const nameInput = document.getElementById("name");
export const jobInput = document.getElementById("job");

export const profileAvatarOpenButton = document.querySelector(
    ".profile__image-container"
);