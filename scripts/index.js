const buttonArray = []

for (const btn of document.getElementsByTagName("button")) {
    if (btn.id || btn.className == 'popup__close-button') {
        buttonArray.push(btn);
    }
}

const initialCards = [{
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

function newPopup(button_id) {
    document.getElementById(button_id + "Popup").
    classList.toggle("popup_active");
}


function closePopup(e) {
    e.parentElement.parentElement.classList.remove("popup_active");
}


function addPicture(name, link, remote) {
    console.log(link);
    const _li = document.createElement("li")
    const _img = document.createElement("img")
    const _id = `${name.toLowerCase() + (Math.random() * 10)}`.replaceAll(" ", "_");

    _img.src = link;
    _img.alt = name;
    _img.className = "gallery__card-image";

    const trashIcon = document.createElement("button");

    trashIcon.type = "button";
    trashIcon.className = "gallery__card-button trashIcon";
    trashIcon.onclick = e => { e.target.parentElement.remove(); };

    _li.appendChild(trashIcon);


    _img.onclick = () => {
        const _pop = document.getElementById("picPresentation");
        const container = document.getElementById("pictureContainer");
        const picture_text = document.getElementById("picture_description");

        const _copy_img = _img.cloneNode();

        console.log(_copy_img.className);
        _copy_img.className = "";
        _copy_img.classList.add("specialPic");
        console.log(picture_text)
        container.insertBefore(_copy_img, picture_text);
        picture_text.innerHTML = name;
        _pop.classList.add("popup_active");


    }


    const _div = document.createElement("div");
    _div.className = "gallery__card-container";

    const _h2 = document.createElement("h2")
    _h2.className = "gallery__card-title";
    _h2.innerHTML = name;

    const _btn = document.createElement("button");
    _btn.type = "button";
    _btn.className = "gallery__card-button";
    _btn.onclick = e => e.target.classList.toggle("like");

    _div.appendChild(_h2);
    _div.appendChild(_btn)

    _li.appendChild(_img);
    _li.appendChild(_div);

    const gallery_container = document.querySelector(".gallery__container");
    if (!remote) {
        gallery_container.appendChild(_li);
    } else {
        gallery_container.insertBefore(_li, gallery_container.firstElementChild);
    }

}

for (const pic of initialCards) {
    addPicture(pic.name, pic.link, false);
}

function generatePopup(popup_name) {

    const mainContainer = document.querySelector(".main");
    let popup_title = ""
    let button_text = ""
    let first_placeholder = ""
    let second_placeholder = ""

    function addStory(e) {
        e.preventDefault();

        const _form = e.target;

        const title = _form["name"].value;
        const image_link = _form["myvalue"].value;

        addPicture(title, image_link, true);

        document.querySelector(".popup_active").remove();
    }

    function editProfileInfo(e) {
        e.preventDefault();

        const _form = e.target;

        document.querySelector(".profile__name").innerHTML = _form["name"].value;
        document.querySelector(".profile__description").innerHTML = _form["myvalue"].value;

        document.querySelector(".popup_active").remove();
    }

    switch (popup_name) {
        case 'addPicturePopup':
            popup_title = "New place";
            button_text = "Create";
            first_placeholder = "Title";
            second_placeholder = "Image link";
            break;
        case 'editProfilePopup':
            popup_title = "Edit profile";
            button_text = "Save";
            first_placeholder = 'Jacques Cousteau';
            second_placeholder = "Explorer";
            break;
    }

    mainContainer.insertAdjacentHTML("beforeend", `
    <section id="${popup_name}" class="popup popup_active">
    <div class="popup__container">
        <button id="close_${popup_name}" type="button" class="popup__close-button"></button>
        <div class="popup__form-container">
            <h2 class="popup__title">${popup_title}</h2>
            <form id="submit_${popup_name}" class="form popup__form" name="form">
                <fieldset class="form__fieldset">
                    <input class="form__input" type="text" id="name" placeholder="${first_placeholder}" name="name" />
                    <input class="form__input" type="text" id="myvalue" placeholder="${second_placeholder}" name="myvalue" />
                </fieldset>
                <fieldset class="form__fieldset-button">
                    <button type="submit" class="form__button">${button_text}</button>
                </fieldset>
            </form>
        </div>
    </div>
    </section>`)



    const displayed_form = document.getElementById("submit_" + popup_name);

    switch (popup_name) {
        case 'addPicturePopup':
            displayed_form.onsubmit = addStory;
            break;
        case 'editProfilePopup':
            displayed_form.onsubmit = editProfileInfo;
            break;
    }

    document.getElementById("close_" + popup_name).onclick = () => document.querySelector(".popup_active").remove();
}


document.querySelector(".specialBtn").onclick = e => {
    e.preventDefault();
    const container = e.target;
    container.nextElementSibling.remove();
    document.getElementById("picPresentation").classList.remove("popup_active");
}

buttonArray.forEach(button => {
    let single_button = document.getElementById(button.id);

    if (single_button) {
        single_button.addEventListener("click", () => generatePopup(single_button.id + "Popup", 'Finish'));
    }

    if (button.className == 'popup__close-button') {
        button.addEventListener("click", e => e.target.parentElement.parentElement.classList.remove("popup_active"))
    }
});