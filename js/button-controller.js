import { ModalWindow } from "./Modal.js";

let modal = new ModalWindow();
modal.createModal();

let startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', function () {
    modal.initValue();
    modal.createGame();
});