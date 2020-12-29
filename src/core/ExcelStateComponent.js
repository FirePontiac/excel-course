import { ExcelComponent } from '@core/ExcelComponent';
export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args);
  }
  get template() {
    return JSON.stringify(this.state, null, 2);
  }
  initState(initialState = {}) {
    // Так инициализиуем тут наш state
    this.state = { ...initialState }; // Приватная переменная this.state
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    // Тут сделали допущение что State всегда будет обьектом
    this.$root.html(this.template);
  }
}
