import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }
  toHTML() {
    return `
        <div class="info">fx</div> 
        <div id="formula" class="input" contenteditable spellcheck="false"></div>
        `;
  }

  init() {
    super.init(); // Для добавления слушателей
    // Далее добавляем прослушку события
    this.$formula = this.$root.find('#formula'); // А так 1 запрос к DOM дереву

    this.$on('table:select', ($cell) => {
      // И далее нужно значение текста в ячейке вставить в Input
      // this.$root.find('input') // Так получается что будем каждый раз делать запрос к DOM дереву, это плохо
      this.$formula.text($cell.text());
    });
    this.$on('table:input', ($cell) => {
      // Это для того что мы ввели в Table ячейке, отобразилось в Формуле
      this.$formula.text($cell.text());
    });
  }

  onInput(event) {
    // formula:input Так назёвом чтобы не запутаться в событиях
    // Было const text = event.target.textContent.trim();
    this.$emit('formula:input', $(event.target).text()); // Стало, По этому методу получаем Текст
  }

  onKeydown(event) {
    // Обработаем Tab Хотя и без него у меня работает, может баг в другом браузере
    const keys = ['Enter', 'Tab'];
    // Было if (event.key === 'Enter') {
    if (keys.includes(event.key)) {
      event.preventDefault(); // Сброс этого события по нажатию на Enter
      this.$emit('formula:done'); // Новое событие зависещее от formula.js и далее в Table.js
    }
  }
}
