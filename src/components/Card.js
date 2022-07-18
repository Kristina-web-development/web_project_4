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
        this._cardLikes = data.likes;
        this._id = data._id;
        this._owner = data.owner;
        this._userId = data.userId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardLikeClick = handleCardLike;

        this._deleteCardConfirmation = deleteCardConfirmation;
        this._deleteGalleryCard = this._deleteGalleryCard.bind(this);
    }

    _renderLikes(cardLikeButton, cardLikesCounter) {
        if (this._cardLikes) {
            cardLikesCounter.textContent = this._cardLikes.length;
        }

        if (this.hasLikes()) {
            cardLikeButton.classList.add("gallery__card-button_active");
        } else {
            cardLikeButton.classList.remove("gallery__card-button_active");
        }
    }

    _handleLike(e) {
        this._handleCardLikeClick(this._id);
    }

    hasLikes() {
        if (this._cardLikes) {
            return this._cardLikes.length > 0;
        }
        return false;
    }

    isLiked(profileId) {
        if (this._cardLikes) {
            return this._cardLikes.some((user) => user._id === profileId);
        }
        return false;
    }

    updateLikes(likes, cardLikeButton, cardLikesCounter) {
        this._cardLikes = likes;
        this._renderLikes(cardLikeButton, cardLikesCounter);
    }

    _deleteGalleryCard(e) {
        e.target.closest(".gallery__card").remove();
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
        cardLikeButton.addEventListener("click", (event) => {
            this._handleLike(event);
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

    generateCard() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector(".gallery__card-image");
        this._cardLikeButton = this._cardElement.querySelector(
            ".gallery__card-button"
        );
        this._cardDeleteButton = this._cardElement.querySelector(
            ".gallery__delete-card"
        );
        this._cardLikesCounter = this._cardElement.querySelector(
            ".gallery__card-likes-counter"
        );

        this._cardImage.setAttribute("src", this._cardLink);
        this._cardImage.setAttribute("alt", this._cardTitle);
        this._cardImage.setAttribute("id", this._id);
        this._cardElement.querySelector(".gallery__card-title").textContent =
            this._cardTitle;
        this._renderLikes(this._cardLikeButton, this._cardLikesCounter);
        this._setEventListeners(
            this._cardImage,
            this._cardLikeButton,
            this._cardDeleteButton
        );

        if (this._owner._id !== this._userId) {
            this._cardDeleteButton.remove();
        }

        return this._cardElement;
    }
}

export { Card };