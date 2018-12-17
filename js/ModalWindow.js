import {Sapper} from "./Sapper.js";
import * as data  from "./Data.js";
import * as utils from "./Utils.js";

class ModalWindow {
    constructor() {
        this.tableRow = 0;
        this.tableColumn = 0;
        this.tableCountbomb = 0;
    }

   createModal() {
       let divTable = document.querySelector('.game');
       let modalForm = document.createElement('form');
       let modalWin = document.createElement('div');
       modalWin.id = 'modalWin';
       modalWin.style.display = 'block';
       divTable.appendChild(modalWin);
       modalWin.appendChild(modalForm);
       data.MODAL_DATA.forEach(function (element) {
           let input = document.createElement(element.node);
           input.setAttribute('id', element.id);
           input.setAttribute('placeholder', element.placeholder);
           input.setAttribute('type', element.type);
           if (element.type === 'button') input.value = 'Start Game';
           modalForm.appendChild(input);
       })
   }

   closeModal() {
        let startBtn = utils.getElementId('startBtn');
        let modalWin = utils.getElementId('modalWin');
        startBtn.onclick = function () {
            modalWin.style.display = 'none';
       };
   }

   initValue() {
       this.tableCountbomb = utils.getElementId('bombInput', true);
       this.tableRow = utils.getElementId('rowInput', true);
       this.tableColumn = utils.getElementId('columnInput', true);
       utils.setLocalStorage('countBomb', this.tableCountbomb);
       utils.setLocalStorage('row', this.tableRow);
       utils.setLocalStorage('column',this.tableColumn);
   }

   confirmValue() {
       let startBtn = utils.getElementId('startBtn');
       startBtn.addEventListener('click', this.initValue);
   }

   createGame() {
       let startBtn = utils.getElementId('startBtn');
       startBtn.addEventListener('click', function () {
           let newGame = new Sapper();
           newGame.startGame();
       } )
   }
}

let btn = document.querySelector('#startSapper');
btn.addEventListener('click', function () {
    let modal = new ModalWindow();
    modal.createModal();
    modal.initValue();
    modal.confirmValue();
    modal.createGame();
    modal.closeModal();
    btn.style.display='none'
});
