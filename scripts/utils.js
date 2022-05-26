import { Card } from "./Card.js";
const galleryContainer = document.querySelector(".gallery__container");
const nameInput = document.getElementById("name");
const jobInput = document.getElementById("job");

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

function openPopup(popup) {
    popup.classList.add("popup_active");
    document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
    document.removeEventListener("keydown", closeByEscape);
    popup.classList.remove("popup_active");
}

function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_active");
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

function disableButton(button) {
    button.setAttribute("disabled", true);
    button.classList.add("form__button_disabled");
}

function clickClosePopup(evt) {
    if (evt.target.classList.contains("popup")) {
        closePopup(evt.target);
    }
}

function openNewPlacePopup() {
    openPopup(newPlacePopup);
}

function setProfileFormValues() {
    const profileName = document.querySelector(".profile__name");
    const profileJob = document.querySelector(".profile__description");

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function openProfilePopup() {
    openPopup(profilePopup);
    setProfileFormValues();
}

function handleBigPicturePopup(e) {
    const clickedPicture = e.target;
    const clickedPictureSrc = clickedPicture.getAttribute("src");
    const clickedPictureTitle = clickedPicture.getAttribute("alt");
    const pictureContainer = bigPicturePopup.querySelector("img");
    const bigPicturePopupText = bigPicturePopup.querySelector("p");

    pictureContainer.setAttribute("src", clickedPictureSrc);
    pictureContainer.setAttribute("alt", clickedPictureTitle);

    bigPicturePopupText.textContent = clickedPictureTitle;

    openPopup(bigPicturePopup);
}

function handleProfileFormSubmit(
    profileName,
    profileJob,
    profilePopup,
    profilePopupSubmitButton
) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    disableButton(profilePopupSubmitButton);
    closePopup(profilePopup);
}

function addCardToGallery(cardElement) {
    galleryContainer.prepend(cardElement);
}

function handleNewPlaceFormSubmit(
    newPlacePopup,
    newPlaceSubmitButton,
    newPlaceForm,
    galleryCardTemplateSelector
) {
    const newCardTitle = newPlaceForm.cardTitle.value;
    const newCardLink = newPlaceForm.cardLink.value;

    const newCard = new Card({ name: newCardTitle, link: newCardLink },
        galleryCardTemplateSelector
    ).generateCard();
    addCardToGallery(newCard);
    newPlaceForm.reset();
    disableButton(newPlaceSubmitButton);
    closePopup(newPlacePopup);
}

export {
    openPopup,
    closePopup,
    disableButton,
    clickClosePopup,
    openNewPlacePopup,
    openProfilePopup,
    handleBigPicturePopup,
    handleProfileFormSubmit,
    handleNewPlaceFormSubmit,
    addCardToGallery,
    initialCards,
};