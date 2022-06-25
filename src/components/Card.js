class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._cardTitle = data.name;
        this._cardLink = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector(".gallery__card-image");
        this._cardLikeButton = this._cardElement.querySelector(
            ".gallery__card-button"
        );
        this._cardDeleteButton = this._cardElement.querySelector(
            ".gallery__delete-card"
        );
    }

    _deleteGalleryCard(e) {
        e.target.closest(".gallery__card").remove();
    }

    _handleImageClick() {
        this._cardImage.addEventListener("click", () => {
            this._handleCardClick(this._cardLink, this._cardTitle);
        });
    }

    _handleCardDeleteButton() {
        this._cardDeleteButton.addEventListener("click", this._deleteGalleryCard);
    }

    _handleCardLikeButton() {
        this._cardLikeButton.addEventListener("click", (event) => {
            event.target.classList.toggle("gallery__card-button_active");
        });
    }

    _setEventListeners() {
        this._handleImageClick();
        this._handleCardDeleteButton();
        this._handleCardLikeButton();
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._cardImage.setAttribute("src", this._cardLink);
        this._cardImage.setAttribute("alt", this._cardTitle);

        this._setEventListeners();

        return this._cardElement;
    }
}

export { Card };