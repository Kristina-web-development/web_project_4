export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose = (e) => {
        if (e.key === "Escape") {
            this.close();
        }
    };

    open() {
        this._popupElement.classList.add("popup_active");
        document.addEventListener("keyup", this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove("popup_active");
        document.removeEventListener("keyup", this._handleEscClose);
    }

    setEventListeners() {
        this._popupElement.addEventListener("mousedown", (evt) => {
            if (
                evt.target.classList.contains("popup") ||
                evt.target.classList.contains("popup__close-button")
            ) {
                this.close();
            }
        });
    }
}