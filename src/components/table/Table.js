import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
      super ($root, {
        listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
      }) 
      
    }

    toHTML() {
        // А тут будем вызывать метод createTable() Т.е. функцию из файла table.template.js
        // В скобки createTable() можно передавать количество строк и получать таблицу гораздо большего размера
        return createTable(20) // Тут будем оперировать обычными строчками которые будем генерировать     
    }

    onClick() {
      console.log('click')
    }

    onMouseup() {
      console.log('Up')
    }

    onMousedown(event) {
      console.log('mousedown', event.target)
    }

    onMousemove () {
      console.log('move')
    }
}