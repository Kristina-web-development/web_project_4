import Popup from './Popup.js'

export class PopupWithImage extends Popup {
    open(link, text) {
        super.open()

        const imageElement = this._popupElement.querySelector('img');
        const captionElement = this._popupElement.querySelector('p');

        imageElement.src = link;
        imageElement.alt = text;
        captionElement.textContent = text;


    }
}