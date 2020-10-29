const CODES = {
    A: 65,
    Z: 90,
    '1': 49,
    '9': 57
} 
// function toCell(row, col) { 
//     return `<div class="cell" contenteditable 
//     data-col="${col}" 
//     data-row="${row}"></div> `
// }

function toCell(row) { // Это само замыкание, Функция возвращает функцию
    return function(_, col) {
        return `<div class="cell" contenteditable 
            data-col="${col}"
            data-type="cell"
            data-id="${row}:${col}"
            ></div> ` 
    } // data-id="${row}:${col}" Это id каждой ячейки; : - это для разделения значений; легко искать на странице одинаковые элементы
}

function toColumn(col, index) { 
    return `<div class="column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
            </div>`
}
function createRow(index, content) { 
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `<div class="row" data-type="resizable">
                <div class="row-info">
                ${index ? index : ''}
                ${resize}    
                </div>
                <div class="row-data">${content}</div>
            </div>`
} 
function toChar(_, index) { 
    return String.fromCharCode(CODES.A + index) 
}
export function createTable(rowsCount = 15) {    
    const colsCount = CODES.Z - CODES.A + 1 
    const rows = []
    const cols = new Array(colsCount)  
    .fill('') 
    .map(toChar) 
    .map(toColumn) 
    .join('') 
    rows.push(createRow(null, cols))  // Колонки нумеруются с 0, а строки начинаются от 1 ой
    for (let row =0; row < rowsCount; row++) { // было i, теперь row является строкой после каждой итерации; Он же и передаётся в createRow Этот индекс
        const cells = new Array(colsCount) 
        .fill('')
        // .map((_, col) => toCell(row, col))  // Переделали было просто toCell
        .map(toCell(row)) // А это без CallBack ка, через замыкание, когда функция возврящает функцию; Отрефакторили, выше сама функция
        .join('')
        rows.push(createRow(row + 1, cells)) // Вмсето row было i 
    }
    return rows.join('') 
}