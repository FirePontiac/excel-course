import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'], // Подпишемся только на поле внутри State
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
    super.init();
    this.$formula = this.$root.find('#formula'); // А так 1 запрос к DOM дереву

    this.$on('table:select', ($cell) => {
      // Было this.$formula.text($cell.text());
      this.$formula.text($cell.data.value);
    });
  }
  storeChanged({ currentText }) {
    this.$formula.text(currentText);
  }

  onInput(event) {
    // const text = $(event.target.text());
    // debugger;
    this.$emit('formula:input', $(event.target).text()); // Стало, По этому методу получаем Текст
    // this.$emit('formula:input', text);
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}
