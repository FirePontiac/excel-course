import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent { // Исходно у нас 4 класса formula, header, table, toolbar
    static className = 'excel__formula' // className будет корневым классом для данного блока

    constructor($root) { // Через него обрабатывать будем
        super ($root, { // Вот теперь будем описывать тут что будет делать формула, через набор опций
            name: 'Formula', // Сперва зададим имя этому компоненту, дабы потом отлаживать, и понимать что и где пошло не так
            listeners: ['input', 'click'], // В массиве будем добавлять слушателей для этого компонента
        }) 
    }

    toHTML() {
        return `
        <div class="info">fx</div> 
        <div class="input" contenteditable spellcheck="false"></div>
        ` // Можно парсить html как во vue : @input="название метода" ; но опять же не наш стиль, и будем делать это без парсеров
        // return super.toHTML(); - вызов родительского метода
    }

    // jQuery style Так обрабарывать инпут:
    // init() {
    //     this.$root.on('input', function () {

    //     }) // Но это не наш стиль

    onInput(event) { // Зависит от 9 ой строки (конвенция); далее тут и далее будут задаваться события таким образом
        // console.log('Formula output', event.target.value); // Было
        console.log('Formula: onInput', event.target.textContent.trim())
    }

    onClick(event) {
        // console.log('Formula output', event.target.value); // Было
        console.log('mk')
    }

}

