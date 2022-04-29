const profilePopup = document.getElementById("profilePopup");
const profilePopupOpenButton = document.querySelector(".profile__open-button");
const profilePopupCloseButton = profilePopup.querySelector(".popup__close-button");
const popupForm = profilePopup.querySelector(".form");

const newPlacePopup = document.getElementById("newPlacePopup");
const newPlacePopupCloseButton = newPlacePopup.querySelector(".popup__close-button");
const newPlaceForm = newPlacePopup.querySelector("form");
const newPlaceButton = document.getElementById("newPlaceButton");

const bigPicturePopup = document.getElementById("bigPicturePopup");
const bigPicturePopupCloseButton = bigPicturePopup.querySelector(".popup__close-button");

const initialCards = [{
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

function openProfilePopup() {
    profilePopup.classList.add("popup_active");

    let nameInput = document.getElementById("name");

    let jobInput = document.getElementById("job");

    let profileName = document.querySelector(".profile__name");
    let profileJob = document.querySelector(".profile__description");

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closeActivePopup(e, forceClose) {
    let activePopup = document.querySelector(".popup_active");

    if (forceClose) {
        activePopup.classList.remove("popup_active");
        return;
    }
    activePopup.classList.add("popup_closing");
    setTimeout(() => activePopup.classList.remove("popup_active", "popup_closing"), 400);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let nameInput = document.getElementById("name");

    let jobInput = document.getElementById("job");

    let profileName = document.querySelector(".profile__name");
    let profileJob = document.querySelector(".profile__description");

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    profilePopup.classList.remove("popup_active");
}

function deleteGalleryCard(e) {
    e.target.parentElement.remove();
}

/**
 * 
 * @param {String} title Image title
 * @param {String} link Link to image
 * @param {Boolean} first_place Whether to add new picture on first place or not
 */
function addCardToGallery(title, link, first_place) {

    let cardTemplate = document.getElementById("galleryCard");
    let galleryContainer = document.querySelector(".gallery__container");

    /** Cloning card template and getting its image and title elements */
    let newCard = cardTemplate.content.cloneNode(true);
    let cardImage = newCard.querySelector("img");
    let cardTitle = newCard.querySelector(".gallery__card-title");
    let cardLikeButton = newCard.querySelector(".gallery__card-button");
    let cardDeleteButton = newCard.querySelector(".gallery__delete-card");


    /** 
     *  Changing img src attribute to load the picture from the link argument
     *  Setting text that appears when a user moves mouse pointer over the image, and text under the card picture
     */
    cardImage.setAttribute("src", link);
    cardImage.setAttribute("alt", title);
    cardTitle.textContent = title;

    /** Click on image triggers our popup to show up */
    cardImage.addEventListener("click", handleBigPicturePopup);
    cardDeleteButton.addEventListener("click", deleteGalleryCard);
    /** Like button click event */
    cardLikeButton.addEventListener("click", event => event.target.classList.toggle("liked"));

    /** Adding our new card to the card gallery  */
    if (first_place) {
        galleryContainer.insertBefore(newCard, galleryContainer.firstElementChild);
        return;
    }
    galleryContainer.appendChild(newCard);
}

function openNewPlacePopup() {
    newPlacePopup.classList.add("popup_active");
}

function newPlaceFormSubmit(e) {
    e.preventDefault();

    let newCardTitle = newPlaceForm.cardTitle.value;
    let newCardLink = newPlaceForm.cardLink.value;

    addCardToGallery(newCardTitle, newCardLink, true);

    newPlacePopup.classList.remove("popup_active");

}

function handleBigPicturePopup(e) {

    let clickedPicture = e.target;
    let clickedPictureSrc = clickedPicture.getAttribute("src");
    let clickedPictureTitle = clickedPicture.getAttribute("alt");

    let bigPictureImage = bigPicturePopup.querySelector("img");
    let pictureContainer = bigPicturePopup.querySelector("img");
    pictureContainer.setAttribute("src", clickedPictureSrc);

    let bigPicturePopupText = bigPicturePopup.querySelector("p");
    bigPicturePopupText.textContent = clickedPictureTitle;

    bigPicturePopup.classList.add("popup_active");
}

profilePopupOpenButton.addEventListener("click", openProfilePopup);
profilePopupCloseButton.addEventListener("click", closeActivePopup);
popupForm.addEventListener("submit", handleProfileFormSubmit);

newPlaceButton.addEventListener("click", openNewPlacePopup);
newPlacePopupCloseButton.addEventListener("click", closeActivePopup);
newPlaceForm.addEventListener("submit", newPlaceFormSubmit);

bigPicturePopupCloseButton.addEventListener("click", closeActivePopup);

for (let card of initialCards) {
    addCardToGallery(card.name, card.link);
}