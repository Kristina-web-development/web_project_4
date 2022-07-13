import "./index.css";
import { Card } from "../components/Card.js";

import Api from "../components/api";
import Section from "../components/Section.js";
import PopupWithConfirmation from "../components/popupWithConfirmation";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator";
import { PopupWithImage } from "../components/PopupWithImage";
import {
    configurations,
    newPlaceButton,
    profilePopupOpenButton,
    galleryCardTemplateSelector,
    cardsWrap,
    nameInput,
    jobInput,
    profilePopupForm,
    newPlaceForm,
    profileAvatarOpenButton,
    avatarForm,
} from "../utils/constants.js";

const createCard = (cardData) => {
    cardData.userId = userInfo.getUserInfo()["_id"];
    const _card = new Card(
        cardData,
        galleryCardTemplateSelector,
        (link, name) => {
            bigPicturePopup.open(link, name);
        },
        (e) => {
            deleteCardPopup.open();

            deleteCardPopup.setAction(() => {
                deleteCardPopup.renderLoading(true);
                api
                    .deleteCard(_card._id)
                    .then(() => {
                        _card.removeCard();
                        deleteCardPopup.close();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        deleteCardPopup.renderLoading(false);
                    });
            });
        },
        (id) => {
            const alreadyLiked = _card.isLiked(userInfo.getUserInfo()["_id"]);

            if (alreadyLiked) {
                api
                    .removeLikeCard(id)
                    .then((res) => {
                        _card.updateLikes(res.likes);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                api
                    .addLikeCard(id)
                    .then((res) => {
                        _card.updateLikes(res.likes);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    );
    return _card;
};

const renderCard = (cardData) => {
    const card = createCard(cardData);

    section.addItem(card.generateCard());
};

const userInfo = new UserInfo({
        userNameSelector: ".profile__name",
        userJobSelector: ".profile__description",
        userAvatarSelector: ".profile__image",
    },
    ".profile__info"
);

const section = new Section({
        items: [],
        renderer: renderCard,
    },
    ".gallery__container"
);

const handleNewPlaceFormSubmit = (data) => {
    newPlacePopup.renderLoading(true);
    api
        .addCard({
            title: data["cardTitle"],
            image: data["cardLink"],
        })
        .then((res) => {
            renderCard({
                    name: res["name"],
                    link: res["link"],
                    _id: res["_id"],
                    owner: res["owner"],
                    userId: userInfo.getUserInfo()["_id"],
                },
                cardsWrap,
                newPlacePopup.close()
            );
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            newPlacePopup.renderLoading(false);
        });
};

const handleProfileFormSubmit = (data) => {
    profilePopup.renderLoading(true);
    api
        .addUserInfo(data)
        .then((res) => {
            userInfo.setUserInfo(res.name, res.about, res._id);
            profilePopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            profilePopup.renderLoading(false);
        });
};

const submitAvatar = (avatarLink) => {
    avatarPopup.renderLoading(true);
    api
        .addUserAvatar(avatarLink)
        .then(() => {
            userInfo.setUserAvatar(avatarLink);
            avatarPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            avatarPopup.renderLoading(false);
        });
};

const newPlacePopup = new PopupWithForm(
    "#newPlacePopup",
    handleNewPlaceFormSubmit,
    configurations
);
const profilePopup = new PopupWithForm(
    "#profilePopup",
    handleProfileFormSubmit,
    configurations
);

const avatarPopup = new PopupWithForm(
    "#avatarProfilePopup",
    submitAvatar,
    configurations
);

const deleteCardPopup = new PopupWithConfirmation("#deleteCardPopup");

const bigPicturePopup = new PopupWithImage("#bigPicturePopup");

bigPicturePopup.setEventListeners();
newPlacePopup.setEventListeners();
profilePopup.setEventListeners();
avatarPopup.setEventListeners();
deleteCardPopup.setEventListeners();

function fillProfileInputs(info) {
    nameInput.value = info.name;
    jobInput.value = info.job;
}

newPlaceButton.addEventListener("click", () => {
    newPlaceFormValidator.resetValidation();
    newPlacePopup.open();
});

profilePopupOpenButton.addEventListener("click", () => {
    const formInputs = userInfo.getUserInfo();

    fillProfileInputs(formInputs);

    profilePopup.open();
});

profileAvatarOpenButton.addEventListener("click", () => {
    avatarPopup.open();
});

const profileFormValidator = new FormValidator(
    configurations,
    profilePopupForm
);
const newPlaceFormValidator = new FormValidator(configurations, newPlaceForm);
const avatarFormProfileValidator = new FormValidator(
    configurations,
    avatarForm
);

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
avatarFormProfileValidator.enableValidation();

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
    headers: {
        Authorization: "cd2997d4-0d31-42a2-a383-a9a3b826db8e",
        "Content-Type": "application/json",
    },
});

Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cardsData]) => {
        const userId = userData._id;
        // User
        const { avatar, name, about } = userData;
        const _newAvatar = { avatarLink: avatar };
        console.log(userData);
        userInfo.setUserInfo(name, about, userId);
        userInfo.setUserAvatar(_newAvatar);

        section.addNewItems(cardsData);
    })
    .catch((err) => {
        console.log(err);
    });