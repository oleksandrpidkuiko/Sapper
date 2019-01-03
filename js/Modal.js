import { Sapper } from "./Game.js";
import * as modalData from "./modal-data.config.js";
import * as utils from "./Utils.js";

export class ModalWindow {
    constructor() {
        this.dataForTable = modalData.INIT_MODAL_DATA;
    }

    createModal() {
        const GAME_CONTAINER = document.querySelector('.game'),
              MODAL = document.createElement('form'),
              MODAL_CONTAINER = document.createElement('div');

        MODAL_CONTAINER.id = 'modal-window';
        utils.showElement(MODAL_CONTAINER);
        GAME_CONTAINER.appendChild(MODAL_CONTAINER);
        MODAL_CONTAINER.appendChild(MODAL);
        modalData.INPUT_MODAL_DATA.forEach(({node, id, placeholder, type}) => {
            let input = document.createElement(node);

            input.setAttribute('id', id);
            input.setAttribute('placeholder', placeholder);
            input.setAttribute('type', type);
            input.innerHTML = node === 'button' ? 'Start Game' : null;

            MODAL.appendChild(input);
        });
    }


    initValue() {
        this.dataForTable = {
            ...this.dataForTable,
            tableRow: utils.getElementValue('rowInput'),
            tableColumn: utils.getElementValue('columnInput'),
            tableCountBomb: utils.getElementValue('bombInput')
        };

        utils.setSessionStorage('countBomb', this.dataForTable.tableCountBomb);
        utils.setSessionStorage('row', this.dataForTable.tableRow);
        utils.setSessionStorage('column', this.dataForTable.tableColumn);
    }

    createGame() {
        let newGame = new Sapper();

        newGame.startGame();
    }
}
