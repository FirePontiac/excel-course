import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import {
  shouldResize,
  isCell,
  nextSelection,
  matrix,
} from '@/components/table/table.functions';
import { TableSelection } from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root, options) {
    // Описание в Formula.js
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options, // Описание в Formula.js; ...options, Для родительского класса развернуто так
    });
    // this.unsubs = [] // Создали Массив с подписчиками; этот вариант без фреймворка           
  }
  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
    // console.log('Prepare');
  }
  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
    // Тут про Emitter
    // Без фреймворка можно const unsub = this.emitter.subscribe('it is working', (text) => {
    // Было this.emitter.subscribe('it is working', (text) => {
          this.$on('formula:input', (text) => {

      // Далее чтобы отписаться от этого события? надо воспользоваться другим методом, который еще не описан
      // но соответственно надо:
      // const unsub = this.emitter.subscribe ..... (text) => {
      // И потом это передать в метод desrtroy
      this.selection.current.text(text); // Это тот класс где храниться текущий выбранный элемент; current - переменная класса DOM
      // Далее в dom.js создадим метод text
      // console.log('Table from Formula', text);
    });
    // Подписок будет куча; ниже тоже реализация без фреймворка
    // this.unsubs.push(unsub) // В массив запихиваем новое отписавшоеся событие
    // Эти вещи должны делаться в автоматическом режиме? и следуем писать меньше кода который относиться к этому
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Delete',
    ];
    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      const id = this.selection.current.id(true);
      event.preventDefault();
      const $next = this.$root.find(nextSelection(key, id));
      this.selection.select($next);
    }
  }
// destroy() { // Так можно было реализовать, но у нас есть свой фреймворк для такого рода вещей
//   super.destroy() 
//   this.unsubs.forEach(unsub => unsub()) //То есть уничтожаем после вызова
// }
}

