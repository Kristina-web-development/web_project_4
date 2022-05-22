import { openPopup } from "./utils.js";

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

class Card {
    constructor(data, cardSelector) {
        this._cardTitle = data.name;
        this._cardLink = data.link;
        this._cardSelector = cardSelector;
    }

    _deleteGalleryCard(e) {
        e.target.closest(".gallery__card").remove();
    }

    _handleImageClick(cardImage) {
        cardImage.addEventListener("click", this._handleBigPicturePopup);
    }

    _handleCardDeleteButton(cardDeleteButton) {
        cardDeleteButton.addEventListener("click", this._deleteGalleryCard);
    }

    _handleCardLikeButton(cardLikeButton) {
        cardLikeButton.addEventListener("click", (event) => {
            event.target.classList.toggle("gallery__card-button_active");
        });
    }

    _setEventListeners(cardElement) {
        const cardImage = cardElement.querySelector(".gallery__card-image");
        const cardLikeButton = cardElement.querySelector(".gallery__card-button");
        const cardDeleteButton = cardElement.querySelector(".gallery__delete-card");

        this._handleImageClick(cardImage);
        this._handleCardDeleteButton(cardDeleteButton);
        this._handleCardLikeButton(cardLikeButton);
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.cloneNode(true);

        return cardElement;
    }

    generateCard() {
        const newCard = this._getTemplate();
        const cardImage = newCard.querySelector(".gallery__card-image");
        const cardTitle = newCard.querySelector(".gallery__card-title");

        cardImage.setAttribute("src", this._cardLink);
        cardImage.setAttribute("alt", this._cardTitle);
        cardTitle.textContent = this._cardTitle;

        this._setEventListeners(newCard);

        return newCard;
    }

    _handleBigPicturePopup(e) {
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
}

export { Card, initialCards };