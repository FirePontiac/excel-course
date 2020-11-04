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
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    // Было const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell(this.$root.find('[data-id="0:0"]'));
    // this.selection.select($cell);
    // Было this.$emit('table:select', $next); // Повторил для Кейса когда из таблицы надо сто то сложить в LocalStorage или на Сервер
    // this.$emit('table:select', $cell); В новый метод переместили
    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });

    this.$on('formula:done', () => {
      // Реализовали сброс фокуса с поля формулы на ячейку таблицы куда вводили из формулы
      this.selection.current.focus();
    });
  }

  // Убераем дулирование кода:
  // this.selection.select($cell); и
  // this.$emit('table:select', $cell); Так оно уже дублируется в 2 х методах
  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
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
      this.selectCell($next);
      // this.selection.select($next); // $next Тут выбираем новую ячейку
      // this.$emit('table:select', $next); // Эмитим то ячейку с которой рботаем
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target)); // event.target - $ - обёрнутый в DOM класс
  }
}
