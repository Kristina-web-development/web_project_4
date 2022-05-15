const profilePopup = document.getElementById("profilePopup");
const profilePopupOpenButton = document.querySelector(".profile__open-button");
const profilePopupCloseButton = profilePopup.querySelector(
    ".popup__close-button"
);
const profilePopupForm = profilePopup.querySelector(".form");
const profilePopupSubmitButton = profilePopupForm.querySelector("button");

const newPlacePopup = document.getElementById("newPlacePopup");
const newPlacePopupCloseButton = newPlacePopup.querySelector(
    ".popup__close-button"
);
const newPlaceForm = newPlacePopup.querySelector("form");
const newPlaceButton = document.getElementById("newPlaceButton");
const newPlaceSubmitButton = document.querySelector(
    "form[id=newPlacePopupForm] button"
);

const bigPicturePopup = document.getElementById("bigPicturePopup");
const bigPicturePopupCloseButton = bigPicturePopup.querySelector(
    ".popup__close-button"
);
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__description");

const galleryContainer = document.querySelector(".gallery__container");

const pictureContainer = bigPicturePopup.querySelector("img");
const bigPicturePopupText = bigPicturePopup.querySelector("p");

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

function disableButton(button) {
    button.setAttribute("disabled", true);
    button.classList.add("form__button_disabled");
}

function setProfileFormValues() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function openPopup(popup) {
    popup.classList.add("popup_active");
    document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
    document.removeEventListener("keydown", closeByEscape);
    popup.classList.remove("popup_active");
}

function openProfilePopup() {
    openPopup(profilePopup);
    setProfileFormValues();
}

function openNewPlacePopup() {
    openPopup(newPlacePopup);
}

function openBigPicturePopup() {
    openPopup(bigPicturePopup);
}

function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_active");
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

function clickClosePopup(evt) {
    if (evt.target.classList.contains("popup")) {
        closePopup(evt.target);
    }
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    disableButton(profilePopupSubmitButton);
    closePopup(profilePopup);
}

function deleteGalleryCard(e) {
    e.target.closest(".gallery__card").remove();
}

function createCard(name, link) {
    const cardTemplate = document.getElementById("galleryCard");
    const newCard = cardTemplate.content.cloneNode(true);
    const cardImage = newCard.querySelector(".gallery__card-image");
    const cardTitle = newCard.querySelector(".gallery__card-title");
    const cardLikeButton = newCard.querySelector(".gallery__card-button");
    const cardDeleteButton = newCard.querySelector(".gallery__delete-card");
    cardImage.setAttribute("src", link);
    cardImage.setAttribute("alt", name);
    cardTitle.textContent = name;
    cardImage.addEventListener("click", handleBigPicturePopup);
    cardDeleteButton.addEventListener("click", deleteGalleryCard);
    cardLikeButton.addEventListener("click", (event) =>
        event.target.classList.toggle("gallery__card-button_active")
    );
    return newCard;
}

function addCardToGallery(name, link) {
    const cardElement = createCard(name, link);
    galleryContainer.prepend(cardElement);
}

function handleNewPlaceFormSubmit(e) {
    e.preventDefault();
    const newCardTitle = newPlaceForm.cardTitle.value;
    const newCardLink = newPlaceForm.cardLink.value;

    addCardToGallery(newCardTitle, newCardLink);
    newPlaceForm.reset();
    disableButton(newPlaceSubmitButton);
    closePopup(newPlacePopup);
}

function handleBigPicturePopup(e) {
    const clickedPicture = e.target;
    const clickedPictureSrc = clickedPicture.getAttribute("src");
    const clickedPictureTitle = clickedPicture.getAttribute("alt");

    pictureContainer.setAttribute("src", clickedPictureSrc);
    pictureContainer.setAttribute("alt", clickedPictureTitle);

    bigPicturePopupText.textContent = clickedPictureTitle;

    openBigPicturePopup();
}

profilePopupOpenButton.addEventListener("click", openProfilePopup);
profilePopupForm.addEventListener("submit", handleProfileFormSubmit);

newPlaceButton.addEventListener("click", openNewPlacePopup);
newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);

newPlacePopup.addEventListener("click", clickClosePopup);
profilePopup.addEventListener("click", clickClosePopup);
bigPicturePopup.addEventListener("click", clickClosePopup);

for (const card of initialCards.reverse()) {
    addCardToGallery(card.name, card.link);
}

const closeButtons = document.querySelectorAll(".popup__close-button");

closeButtons.forEach((button) => {
    const popup = button.closest(".popup");

    button.addEventListener("click", () => closePopup(popup));
});