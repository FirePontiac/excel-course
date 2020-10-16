import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
// import {$} from '@core/dom' Этот импорт получается уже лишним
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.functions'
export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor($root) {
      super ($root, {
         listeners: ['mousedown'] 
      })   
    }
    toHTML() { return createTable(20) }
    onMousedown(event) {
      if (shouldResize(event)) { // shouldResize(event) Экспортировали её из table.function.js
        resizeHandler(this.$root, event)
      }
    }
}