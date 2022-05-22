function openPopup(popup) {
    popup.classList.add("popup_active");
    document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
    document.removeEventListener("keydown", closeByEscape);
    popup.classList.remove("popup_active");
}

function closeByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_active");
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

function disableButton(button) {
    button.setAttribute("disabled", true);
    button.classList.add("form__button_disabled");
}

function clickClosePopup(evt) {
    if (evt.target.classList.contains("popup")) {
        closePopup(evt.target);
    }
}

function openNewPlacePopup() {
    openPopup(newPlacePopup);
}

function setProfileFormValues() {
    const nameInput = document.getElementById("name");
    const jobInput = document.getElementById("job");
    const profileName = document.querySelector(".profile__name");
    const profileJob = document.querySelector(".profile__description");

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function openProfilePopup() {
    openPopup(profilePopup);
    setProfileFormValues();
}

export {
    openPopup,
    closePopup,
    disableButton,
    clickClosePopup,
    openNewPlacePopup,
    openProfilePopup,
};