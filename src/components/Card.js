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

        this._deleteCardConfirmation = deleteCardConfirmation;
    }

    _setCardLikes() {
        if (this._cardLikes) {
            this._cardLikesCounter.textContent = this._cardLikes.length;
        }

        if (this.hasLikes()) {
            this._cardLikeButton.classList.add("gallery__card-button_active");
        } else {
            this._cardLikeButton.classList.remove("gallery__card-button_active");
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
            return this._cardLikes.find((user) => user._id === profileId);
        }
        return false;
    }

    updateLikes(likes) {
        this._cardLikes = likes;
        this._setCardLikes();
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
        this._cardDeleteButton.addEventListener(
            "click",
            this._deleteCardConfirmation
        );
    }

    _handleCardLikeButton() {
        this._cardLikeButton.addEventListener("click", (event) => {
            this._handleLike(event);
            event.target.classList.toggle("gallery__card-button_active");
        });
    }

    _setEventListeners() {
        this._handleImageClick();
        this._handleCardDeleteButton(this._id);
        this._handleCardLikeButton(this._id);
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.cloneNode(true);

        return cardElement;
    }

    removeCard() {
        document.getElementById(this._id).closest(".gallery__card").remove();
    }

    generateCard() {
        this._cardImage.setAttribute("src", this._cardLink);
        this._cardImage.setAttribute("alt", this._cardTitle);
        this._cardImage.setAttribute("id", this._id);
        this._cardElement.querySelector(".gallery__card-title").textContent =
            this._cardTitle;
        this._setCardLikes(this._cardLikes);
        this._setEventListeners();

        if (this._owner._id !== this._userId) {
            this._cardDeleteButton.remove();
        }

        return this._cardElement;
    }
}

export { Card };