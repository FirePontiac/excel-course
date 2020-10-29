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
    this.emitter.subscribe('it is working', (text) => {
      this.selection.current.text(text); // Это тот класс где храниться текущий выбранный элемент; current - переменная класса DOM
      // Далее в dom.js создадим метод text
      console.log('Table from Formula', text);
    });
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
}
