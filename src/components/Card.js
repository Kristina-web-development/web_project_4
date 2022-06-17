import { PopupWithImage } from "./PopupWithImage";

class Card {
    constructor(data, cardSelector, handleCardClick) { //handleCardClick) {
        this._cardTitle = data.name;
        this._cardLink = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _deleteGalleryCard(e) {
        e.target.closest(".gallery__card").remove(); //this._element.remove() this._element = null 
    }

    _handleImageClick(cardImage) {
            cardImage.addEventListener("click", () => new PopupWithImage("#bigPicturePopup").open(this._cardLink, this._cardTitle));
        } //this._element

    _handleCardDeleteButton(cardDeleteButton) {
            cardDeleteButton.addEventListener("click", this._deleteGalleryCard);
        } //this._element

    _handleCardLikeButton(cardLikeButton) {
            cardLikeButton.addEventListener("click", (event) => {
                event.target.classList.toggle("gallery__card-button_active");
            });
        } //this._element.querySelector('.card__like-button').classList.toggle('.gallery__card-button_active');

    _setEventListeners(cardElement) {
        const cardImage = cardElement.querySelector(".gallery__card-image");
        const cardLikeButton = cardElement.querySelector(".gallery__card-button");
        const cardDeleteButton = cardElement.querySelector(".gallery__delete-card");

        this._handleImageClick(cardImage);
        this._handleCardDeleteButton(cardDeleteButton);
        this._handleCardLikeButton(cardLikeButton);

        // this._element.querySelector('.gallery__card-image')
        // .addEventListener('click', () => this._handleImageClick());

        // this._element.querySelector('.gallery__card-button')
        // .addEventListener('click', () => this._handleCardLikeButton());

        // this._element.querySelector('.gallery__delete-card')
        // .addEventListener('click', () => this._handleCardDeleteButton());

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
}

export { Card };

// index.js 

// const renderCard = (data, wrap) => {
//     const card = new Card(data, cardSelector, () => {
//         imageModal.open(data.link, data.name)
//     });
//     wrap.prepend(card.getView());
// };