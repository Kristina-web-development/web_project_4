import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
    open(link, name) {
        super.open();

        const imageElement = this._popupElement.querySelector("img");
        const captionElement = this._popupElement.querySelector("p");

        imageElement.src = link;
        imageElement.alt = name;
        captionElement.textContent = name;
    }
}