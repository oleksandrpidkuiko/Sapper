import * as utils from "./Utils.js";

export const INIT_TABLE_DATA = {
    row: 0,
    column: 0,
    bombsCount: utils.getSessionStorage('countBomb'),
    openCount: 0,
    result: 0,
    field: []
};
