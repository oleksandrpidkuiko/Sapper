import { Field } from "./Field.js";
import * as tableData from "./table-data.config.js"

export class TableForGame {
    constructor(row, column){
       this.tableProperties = {
           ...tableData.INIT_TABLE_DATA,
           row: row,
           column: column
       };
    }

    createTable() {
        const GAME_CONTAINER = document.querySelector('.game'),
              TABLE_CONTAINER = document.createElement('table');

        this.tableProperties.field = [];
        GAME_CONTAINER.innerHTML = '';
        TABLE_CONTAINER.className = 'game__table';
        GAME_CONTAINER.appendChild(TABLE_CONTAINER);

        for (let i = 0; i < this.tableProperties.column; i++ ){
            const FIELD_CONTAINER = document.createElement('tr'),
                  tmp = [];

            TABLE_CONTAINER.appendChild(FIELD_CONTAINER);

            for (let j = 0; j < this.tableProperties.row; j++) {
                let field = new Field(),
                    field_td = field.createField();

                tmp.push(field);
                FIELD_CONTAINER.appendChild(field_td);
            }

            this.tableProperties.field.push(tmp);
        }
    }

    putBombs() {
        for (let i = 0; i < this.tableProperties.bombsCount;) {
            let X = parseInt(Math.random() * this.tableProperties.column - 1),
                  Y = parseInt(Math.random() * this.tableProperties.row - 1);

            if (!this.tableProperties.field[X][Y].fieldProperties.hasBomb) {
                this.tableProperties.field[X][Y].fieldProperties.hasBomb = true;
                i++;
            }
        }
    }

    bombsAroundCounter(x, y) {
        let xStart = (x > 0) ? x - 1 : x,
            yStart = (y > 0) ? y - 1 : y,
            xEnd = (x < this.tableProperties.column - 1) ? x + 1 : x,
            yEnd = (y < this.tableProperties.row - 1) ? y + 1 : y,
            count = 0;

        for (let i = xStart; i <= xEnd; i++) {

            for (let j = yStart; j <= yEnd; j++) {
                if (this.tableProperties.field[i][j].fieldProperties.hasBomb && !(x === i && y === j )){
                    count++;
                }
            }
        }

        this.tableProperties.field[x][y].fieldProperties.bombAround = count;
    }

    startCounter() {
        for (let i = 0; i < this.tableProperties.column; i++) {

            for (let j = 0; j < this.tableProperties.row; j++){
                this.bombsAroundCounter(i,j);
            }
        }
    }

}
