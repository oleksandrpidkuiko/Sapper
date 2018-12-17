import { Field } from "./Field.js";
import * as utils from "./Utils.js";

export class TableForGame {
    constructor(row, column){
        this.row = row;
        this.column = column;
        this.bombsCount = utils.getLocalStorage('countBomb');
        this.open_count = 0;
        this.field = [];
    }

    createTable() {
        this.field = [];
        let divTable = document.querySelector('.game');
        divTable.innerHTML = '';
        let table = document.createElement('table');
        table.className = 'game__table';
        divTable.appendChild(table);
        for (let i = 0; i < this.column; i++ ){
            let tr = document.createElement('tr');
            table.appendChild(tr);
            let tmp = [];
            for (let j = 0; j < this.row; j++) {
                let field = new Field();
                let field_td = field.createField();
                tmp.push(field);
                tr.appendChild(field_td);
            }
            this.field.push(tmp);
        }
    }

    putBombs() {
        for (let i = 0; i < this.bombsCount;) {
            let x = parseInt(Math.random() * this.column - 0.001);
            let y = parseInt(Math.random() * this.row - 0.001);
            if (!this.field[x][y].hasBomb) {
                this.field[x][y].hasBomb = true;
                i++;
            }
        }
    }

    bombsAroundCounter(x, y) {
        let xStart = (x > 0) ? x - 1: x;
        let yStart = (y > 0) ? y - 1: y;
        let xEnd = (x < this.column - 1) ? x + 1: x;
        let yEnd = (y < this.row - 1) ? y + 1: y;
        let count = 0;
        for (let i = xStart; i <= xEnd; i++) {
            for (let j = yStart; j <= yEnd; j++) {
                if (this.field[i][j].hasBomb && !(x == i && y == j )){
                    count++;
                }
            }
        }
        this.field[x][y].bombAround = count;
    }

    startCounter() {
        for (let i = 0; i < this.column; i++) {
            for (let j = 0; j < this.row; j++){
                this.bombsAroundCounter(i,j);
            }
        }
    }

}
