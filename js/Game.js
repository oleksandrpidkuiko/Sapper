import { TableForGame } from "./TableForGame.js";
import * as utils from "./Utils.js";

export class Sapper {
    constructor(){
        this.gameTable;
    }

    startGame() {
        let newGameTable = new TableForGame( utils.getSessionStorage('column'), utils.getSessionStorage('row')),
            tableContainer;

        this.gameTable = newGameTable;
        newGameTable.createTable();
        newGameTable.putBombs();
        newGameTable.startCounter();
        tableContainer = document.querySelector('.game__table');
        tableContainer.addEventListener('click', ({target}) => {

            if (target.matches('td') && !target.matches('.lock')) {
                this.openField(event);
            }
        });
        tableContainer.addEventListener('contextmenu', ({target}) => {

            if (target.matches('td')) {
                this.flag(event);
            }
        });
    }

    openField({target}) {
        const X = target.cellIndex,
              Y = target.parentNode.rowIndex;

        this.recurseOpen(X,Y);
    }

    recurseOpen(x,y) {
        const SELECT_FIELD = this.gameTable.tableProperties.field[x][y].fieldProperties,
              TABLE_CONTAINER = document.querySelector('.game__table'),
              FIELD_CONTAINER = TABLE_CONTAINER.rows[y].children[x],
              GAME_PROPERTIES = this.gameTable.tableProperties;

        if (SELECT_FIELD.isOpen) {
            return;
        }

        if (SELECT_FIELD.hasBomb) {
            FIELD_CONTAINER.classList.add('bomb-run');
            setTimeout( function() {
                let newG = new Sapper();

                newG.startGame();
            }, 2000);
            alert('Вы проиграли ');

        } else {
            FIELD_CONTAINER.innerHTML = SELECT_FIELD.bombAround;
            SELECT_FIELD.isOpen = true;
            FIELD_CONTAINER.classList.add('opened');
            GAME_PROPERTIES.openCount++;

            if (GAME_PROPERTIES.column * GAME_PROPERTIES.row - GAME_PROPERTIES.bombsCount === GAME_PROPERTIES.openCount) {
               setTimeout( function() {
                   let newG = new Sapper();

                   newG.startGame();
               }, 2000);
                alert('Вы победили!');
            }

            if(SELECT_FIELD.bombAround === 0) {
                let xStart = x > 0 ? x - 1 : x,
                    yStart = y > 0 ? y - 1 : y,
                    xEnd = x < GAME_PROPERTIES.column - 1 ? x + 1 : x,
                    yEnd = y < GAME_PROPERTIES.row - 1 ? y + 1 : y;

                for (let i = xStart; i <= xEnd; i++) {

                    for (let j = yStart; j <= yEnd; j++) {
                        this.recurseOpen(i,j);
                    }
                }
            }
        }
    }

    flag({target}) {
        event.preventDefault();

        let x = target.cellIndex,
           y = target.parentNode.rowIndex;

        return this.gameTable.tableProperties.field[x][y].fieldProperties.isOpen ? true : target.classList.toggle('lock')
    }
}
