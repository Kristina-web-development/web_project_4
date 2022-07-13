class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._temporaryStorage = [];
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach((data) => {
            this._renderer(data);
        });
    }

    addNewItems(items = []) {
        this._temporaryStorage = [...items];

        this._temporaryStorage.forEach((data) => {
            this._renderer(data);
        });
        this._items = [...this._items, ...this._temporaryStorage];
        this._temporaryStorage = [];
    }

    addItem(element) {
        this._container.prepend(element);
    }
}

export default Section;