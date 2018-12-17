export class Field {
    constructor() {
        this.bombAround = 0;
        this.hasBomb = false;
        this.isOpen = false;
    }
    createField() {
        let table = document.querySelector('.game__table');
        let td = document.createElement('td');
        table.appendChild(td);
        return td;
    }
}