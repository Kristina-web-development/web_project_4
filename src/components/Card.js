class Card {
    constructor(
        data,
        cardSelector,
        handleCardClick,
        deleteCardConfirmation,
        handleCardLike
    ) {
        this._cardTitle = data.name;
        this._cardLink = data.link;
        this._cardLikes = data.likes || [];
        this._id = data._id;
        this._owner = data.owner;
        this._userId = data.userId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardLikeClick = handleCardLike;

        this._deleteCardConfirmation = deleteCardConfirmation;
    }

    _renderLikes() {
        if (this.isLiked()) {
            this._cardLikesCounter.textContent = this._cardLikes.length;
            this._cardLikeButton.classList.add("gallery__card-button_active");
        } else {
            this._cardLikesCounter.textContent = this._cardLikes.length;
            this._cardLikeButton.classList.remove("gallery__card-button_active");
        }
    }

    isLiked() {
        return this._cardLikes.some((user) => user._id === this._userId);
    }

    updateLikes(likes) {
        this._cardLikes = likes;
        this._renderLikes();
    }

    _handleImageClick(cardImage) {
        cardImage.addEventListener("click", () => {
            this._handleCardClick(this._cardLink, this._cardTitle);
        });
    }

    _handleCardDeleteButton(cardDeleteButton) {
        cardDeleteButton.addEventListener("click", this._deleteCardConfirmation);
    }

    _handleCardLikeButton(cardLikeButton) {
        cardLikeButton.addEventListener("click", () => {
            this._handleCardLikeClick(this._id);
        });
    }

    _setEventListeners(cardImage, cardLikeButton, cardDeleteButton) {
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

    removeCard = () => {
        // I'm really sorry but i don't know why this._cardElement doesn't work for me.
        // Everytime i try to delete card, it refers to card template element, but not to card itself
        document.getElementById(this._id).closest(".gallery__card").remove();
    };

    generateCard() {
        this._cardElement = this._getTemplate();

        const cardImage = this._cardElement.querySelector(".gallery__card-image");

        const cardDeleteButton = this._cardElement.querySelector(
            ".gallery__delete-card"
        );
        this._cardLikesCounter = this._cardElement.querySelector(
            ".gallery__card-likes-counter"
        );
        this._cardLikeButton = this._cardElement.querySelector(
            ".gallery__card-button"
        );

        cardImage.setAttribute("src", this._cardLink);
        cardImage.setAttribute("alt", this._cardTitle);
        cardImage.setAttribute("id", this._id);

        this._cardElement.querySelector(".gallery__card-title").textContent =
            this._cardTitle;
        this._renderLikes();

        this._setEventListeners(cardImage, this._cardLikeButton, cardDeleteButton);

        if (this._owner._id !== this._userId) {
            cardDeleteButton.remove();
        }

        return this._cardElement;
    }
}

export { Card };