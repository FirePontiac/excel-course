// Сущность, функция для элемента Таблица, а классы в проекте (названия файлов) будем с большой буквы писать
// rowsCount = 15 можно и по другому назвать, но по умолчанию 15 строк, чем больше тем дольше это будет генерироваться
const CODES = { // В нормальных таблицах, тут далее пишится алгоритм реализации формировании длинной буквенной строки к примеру как в нормальном  Excel
    A: 65,
    Z: 90,
    '1': 49,
    '9': 57
} // Don't use magic number concept


function toCell() {
    return `
    <div class="cell" contenteditable></div>
    `
}



function toColumn(col) { // Тут создаём функцию для столбцов; по названимя так консистентнее
    return `<div class="column">${col}</div>`
}


// Приватная функция, будет создавать структуру строки
// Тут будем получать номер строки, параметр index
function createRow(index, content) { // В row-data хранятся колонки , класс для которых надо создать отдельную функцию
    return `<div class="row">
                <div class="row-info">${index ? index : ''}</div>
                <div class="row-data">${content}</div>
            </div>`
} // Перь Тут чтобы убрать этот передаваемый null в 28 строке

// Приведение элемента массива к символу
function toChar(_, index) { // el обозначим в скобках как _ , тем самым говоря что не используем этот символ; но его надо обозначить чтобы получить доступ до index
    return String.fromCharCode(CODES.A + index) // Дублируем функционал, удаляем его в строке 45 и пишем там в createTable
}

// function toCharWto(_, index) { // моя попытка
//     return String.fromCharCode(CODES(1) + index) 
// }


// export function createTable(rowsCount = 15, numRows=50) { // Тут будет реализован концепт Pure Function (те функции которые зависят только от входных параметров)
export function createTable(rowsCount = 15) {    
    const colsCount = CODES.Z - CODES.A + 1 // Тут переменная количество столбцов; +1 - это чтобы символ Z выводился, это из-за разницы
    
    // const numRows = CODES.'1' - CODES.'9'
    // const numRows = CODES(1) - CODES(9) // моя попытка
    // Строки будем хранить в массиве строк
    const rows = []

    // const rowsArr = [] // моя попытка

    // const rowsOne = new Array(numRows).fill('').map(toCharWto).map(createRow).join('') // моя попытка


    const cols = new Array(colsCount)  // Массив длинной в количество colsCount; fill('') - заполняет пустыми элементами
    .fill('') 
    .map(toChar) // el тут просто пустая строка fill(''); index тут важен, он начинается с 0 и от Констант выше  
        // без String.fromCharCode Тут получаем массив из кодов элементов; перенесено в 33 строку

    // .map(el => createCol(el)) // В таких случаях можно передавать функцию как референс
    .map(toColumn) // Как референс передали
    .join('') // Чтобы привести к строке

    // console.log(cols)

    // rowsArr.push(createRow(rowsOne))  // моя попытка
    // for (let j=0; j < numRows; j++) {
    //     rowsArr.push(createRow()) // 17 ая строка обработка этого элемента
    // }

    // Для строк суть такая же, надло сформировать контент и передать его в createRow
    // Сперва создаём просто ячейки в цикле for; const cells
    rows.push(createRow(null, cols)) // Тут будем формаировать шапку Excel; Заголовки; createRow() принимает content , а контентом является кусок html кода
    
    for (let i=0; i < rowsCount; i++) {

        const cells = new Array(colsCount) // Строки
        .fill('')
        .map(toCell)  // 11 строка
        .join('')

        // Было rows.push(createRow()) // 17 ая строка обработка этого элемента
        // и так всё поломалось ! Т.к. когда работаем с колонками никакой индекс не нужен
        rows.push(createRow(i + 1, cells)) // В цикле передали cells переменную; i + 1 Тут это строки; + 1 так как 0 ой элемент затирается условием в
    }

    // return '<h1>Table</h1>'
    return rows.join('') // Тут будем возвращать массив строк function createRow; Формирует html
}


