export const INPUT_MODAL_DATA = [
    { node: 'input', id: 'bombInput', placeholder: 'Введите количество бомб', type: 'number' },
    { node: 'input', id: 'rowInput', placeholder: 'Введите количество рядков игровой таблицы', type: 'number'},
    { node: 'input', id: 'columnInput', placeholder: 'Введите количество столбцов игровой таблицы', type: 'number'},
    { node: 'button', id: 'startBtn'}
];

export const INIT_MODAL_DATA = {
    tableRow: 0,
    tableColumn: 0,
    tableCountBomb: 0
};
