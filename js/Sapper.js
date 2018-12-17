import { TableForGame } from "./TableForGame.js";
import * as utils from "./Utils.js";

export class Sapper {
    constructor(){
        this.gameTable;
    }

    startGame() {
        let newGameTable = new TableForGame( utils.getLocalStorage('column'), utils.getLocalStorage('row'));
        this.gameTable  = newGameTable;
        newGameTable.createTable();
        newGameTable.putBombs();
        newGameTable.startCounter();
        let table = document.querySelector('.game__table');
        let self = this;
        table.addEventListener('click' , function (event) {
            if (event.target.matches('td')&&!(event.target.matches('.lock'))) self.openField(event);
        });
        table.addEventListener('contextmenu', function (event) {
            if (event.target.matches('td')) self.flag(event);
        })
    }

    openField(event) {
        let x = event.target.cellIndex;
        let y = event.target.parentNode.rowIndex;
        this.recurseOpen(x,y);
    }

    recurseOpen(x,y) {
        let table = document.querySelector('.game__table');
        let td = table.rows[y].children[x];
        if (this.gameTable.field[x][y].isOpen) return;
        if (this.gameTable.field[x][y].hasBomb){
            td.classList.add('bomb-run');
            alert('Вы проиграли ');
            let newG = new Sapper();
            newG.startGame();
        } else {
            td.innerHTML = this.gameTable.field[x][y].bombAround;
            this.gameTable.field[x][y].isOpen = true;
            td.classList.add('opened');
            this.gameTable.open_count++;
            if (this.gameTable.column * this.gameTable.row - this.gameTable.bombsCount === this.gameTable.open_count){
                alert('Вы победили!');
                let newG = new Sapper();
                newG.startGame();
            }
            if(this.gameTable.field[x][y].bombAround === 0){
                let xStart = x > 0 ? x - 1: x;
                let yStart = y > 0 ? y - 1: y;
                let xEnd = x < this.gameTable.column - 1 ? x + 1 : x;
                let yEnd = y < this.gameTable.row - 1 ? y + 1 : y;
                for (let i = xStart; i <= xEnd; i++) {
                    for (let j = yStart; j <= yEnd; j++) {
                        this.recurseOpen(i,j);
                    }
                }
            }
        }
    }

    flag(event) {
       let x = event.target.cellIndex;
       let y = event.target.parentNode.rowIndex;
        if (this.gameTable.field[x][y].isOpen) return;
        event.target.classList.toggle('lock');
        event.preventDefault();
    }
}
