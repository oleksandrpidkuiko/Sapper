import * as fieldData from './field-data.config.js'

export class Field {
    constructor() {
        this.fieldProperties = fieldData.INIT_FIELD_DATA;
    }

    createField() {
        const TABLE_CELL = document.createElement('td');

        this.fieldProperties = {
            ...this.fieldProperties
        };

        return TABLE_CELL;
    }
}
