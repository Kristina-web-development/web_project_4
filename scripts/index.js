const profilePopup = document.getElementById("profilePopup");
const profilePopupOpenButton = document.querySelector(".profile__open-button");
const profilePopupCloseButton = profilePopup.querySelector(
    ".popup__close-button"
);
const popupForm = profilePopup.querySelector(".form");

const newPlacePopup = document.getElementById("newPlacePopup");
const newPlacePopupCloseButton = newPlacePopup.querySelector(
    ".popup__close-button"
);
const newPlaceForm = newPlacePopup.querySelector("form");
const newPlaceButton = document.getElementById("newPlaceButton");

const bigPicturePopup = document.getElementById("bigPicturePopup");
const bigPicturePopupCloseButton = bigPicturePopup.querySelector(
    ".popup__close-button"
);
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__description");

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

function setProfileFormValues() {
    const nameInput = document.getElementById("name");
    const jobInput = document.getElementById("job");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function openPopup(popup) {
    popup.classList.add("popup_active");
}

function closePopup(popup) {
    popup.classList.remove("popup_active");
}

function openProfilePopup() {
    openPopup(profilePopup);
    setProfileFormValues();
}

function closeProfilePopup() {
    closePopup(profilePopup);
}

function openNewPlacePopup() {
    openPopup(newPlacePopup);
}

function closeNewPlacePopup() {
    closePopup(newPlacePopup);
}

function openBigPicturePopup() {
    openPopup(bigPicturePopup);
}

function closeBigPicturePopup() {
    closePopup(bigPicturePopup);
}

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_visible");
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove("form__input_type_error");
    errorElement.textContent = "";
    errorElement.classList.remove("form__input-error_visible");
}

document.addEventListener("keydown", function(evt) {
    const key = evt.key;
    if (key === "Escape") {
        closePopup(profilePopup);
        closePopup(newPlacePopup);
        closePopup(bigPicturePopup);
    }
});

document.addEventListener("click", function(evt) {
    if (evt.target === profilePopup) {
        closePopup(profilePopup);
    }
    if (evt.target === newPlacePopup) {
        closePopup(newPlacePopup);
    }
    if (evt.target === bigPicturePopup) {
        closePopup(bigPicturePopup);
    }
});

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
    } else {
        buttonElement.classList.remove("form__button_disabled");
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".form__input"));
    const buttonElement = formElement.querySelector(".form__button");
    //buttonElement.classList.add("popup__button_inactive");
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameInput = document.getElementById("name");

    const jobInput = document.getElementById("job");

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeProfilePopup();
}

function deleteGalleryCard(e) {
    e.target.parentElement.remove();
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
        event.target.classList.toggle("liked")
    );
    return newCard;
}

function addCardToGallery(name, link) {
    const galleryContainer = document.querySelector(".gallery__container");
    const cardElement = createCard(name, link);
    galleryContainer.prepend(cardElement);
}

function newPlaceFormSubmit(e) {
    e.preventDefault();

    const newCardTitle = newPlaceForm.cardTitle.value;
    const newCardLink = newPlaceForm.cardLink.value;

    addCardToGallery(newCardTitle, newCardLink);
    closeNewPlacePopup();
    newPlaceForm.reset();
}

function handleBigPicturePopup(e) {
    const clickedPicture = e.target;
    const clickedPictureSrc = clickedPicture.getAttribute("src");
    const clickedPictureTitle = clickedPicture.getAttribute("alt");

    const pictureContainer = bigPicturePopup.querySelector("img");
    pictureContainer.setAttribute("src", clickedPictureSrc);
    pictureContainer.setAttribute("alt", clickedPictureTitle);
    const bigPicturePopupText = bigPicturePopup.querySelector("p");
    bigPicturePopupText.textContent = clickedPictureTitle;

    openBigPicturePopup();
}

profilePopupOpenButton.addEventListener("click", openProfilePopup);
profilePopupCloseButton.addEventListener("click", closeProfilePopup);
popupForm.addEventListener("submit", handleProfileFormSubmit);

newPlaceButton.addEventListener("click", openNewPlacePopup);
newPlacePopupCloseButton.addEventListener("click", closeNewPlacePopup);
newPlaceForm.addEventListener("submit", newPlaceFormSubmit);

bigPicturePopupCloseButton.addEventListener("click", closeBigPicturePopup);

for (const card of initialCards.reverse()) {
    addCardToGallery(card.name, card.link);
}

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".form"));

    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });
};

enableValidation();