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

    removeCard

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

// export default class Card {
//     constructor(
//       { data, handleImageClick, handleTrashClick, handleLikeClick },
//       cardSelector,
//       userId
//     ) {
//       this._text = data.name;
//       this._image = data.link;
//       this._likes = data.likes;
//       this._id = data._id;
//       this._owner = data.owner;
//       this._cardSelector = cardSelector;
//       this._userId = userId;

//       this._handleImageClick = handleImageClick;
//       this._handleTrashClick = handleTrashClick;
//       this._handleLikeClick = handleLikeClick;
//     }

//     _getTemplate() {
//       const cardTemplate = document
//         .querySelector(this._cardSelector)
//         .content.querySelector(".gallery__card");
//       const cardElement = cardTemplate.cloneNode(true);

//       return cardElement;
//     }

//     generateCard() {
//       this._element = this._getTemplate();
//       this._setEventListeners();

//       const cardImage = this._element.querySelector(".gallery__card-image");
//       const cardTitle = this._element.querySelector(".gallery__card-place");
//       const likeCounter = this._element.querySelector(
//         ".gallery__card-like_counter"
//       );
//       const trashButton = this._element.querySelector(
//         ".gallery__card-trash-button"
//       );

//       cardImage.style.backgroundImage = `url(${this._image})`;
//       cardTitle.textContent = this._text;

//       if (this._owner._id !== this._userId) {
//         trashButton.classList.remove("gallery__card-trash-button_active");
//       }

//       this._renderLikes();

//       return this._element;
//     }

//     _setEventListeners() {
//       const likeButton = this._element.querySelector(
//         ".gallery__card-like_button"
//       );
//       const trashButton = this._element.querySelector(
//         ".gallery__card-trash-button"
//       );
//       const cardImage = this._element.querySelector(".gallery__card-image");

//       cardImage.addEventListener("click", () => this._handleImageClick());

//       likeButton.addEventListener("click", () => this._handleLikeClick(this._id));

//       trashButton.addEventListener("click", () =>
//         this._handleTrashClick(this._id)
//       );
//     }

//     isLiked() {
//       return this._likes.some((person) => person._id === this._userId);
//     }

//     updateLikes(likes) {
//       this._likes = likes;
//       this._renderLikes();
//     }

//     _renderLikes() {
//       const likeButton = this._element.querySelector(
//         ".gallery__card-like_button"
//       );
//       const likeCounter = this._element.querySelector(
//         ".gallery__card-like_counter"
//       );
//       likeCounter.textContent = this._likes.length;

//       if (this.isLiked()) {
//         likeButton.classList.add("gallery__card-like_button_active");
//       } else {
//         likeButton.classList.remove("gallery__card-like_button_active");
//       }
//     }

//     removeCard() {
//       this._element.remove();
//       this._element = null;
//     }
//   }