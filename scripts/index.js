let popup = document.querySelector(".popup");
let profileOpenbutton = document.querySelector(".profile__open-button");
let popupClosebutton = popup.querySelector(".popup__close-button");
let popupForm = document.querySelector(".form");

function openPopup() {
    popup.classList.add("popup_active");

    let nameInput = document.getElementById("name");

    let jobInput = document.getElementById("job");

    let profileName = document.querySelector(".profile__name");
    let profileJob = document.querySelector(".profile__description");

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup() {
    popup.classList.remove("popup_active");
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let nameInput = document.getElementById("name");

    let jobInput = document.getElementById("job");

    let profileName = document.querySelector(".profile__name");
    let profileJob = document.querySelector(".profile__description");

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popup.classList.remove("popup_active");
}

profileEditbutton.addEventListener("click", openPopup);

popupClosebutton.addEventListener("click", closePopup);

popupForm.addEventListener("submit", handleProfileFormSubmit);