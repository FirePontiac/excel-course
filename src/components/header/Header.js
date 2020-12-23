import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { changeTitle } from '@/redux/actions';
import { defaultTitle } from '@/constants';
import { debounce } from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300); // 300 Миллисекунд; Так теряем контект функции dispatch; Избавились переписам немного саму debounce
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle; // Так получаем поле Title; если не определено то defaultTitle
    return `
        <input type="text" class="input" value="${title}"/> 
        <div>
            <div class="button">
                <i class="material-icons">delete</i>
            </div>
            <div class="button">
                <i class="material-icons">exit_to_app</i>
            </div>
        </div>
        `;
  }
  onInput(event) {
    // Это тоже вызывается на каждое нажатие, Надо задебаунсить
    const $target = $(event.target); // $target Обёртка события event
    // Далее надо задиспатчить то что ввели в инпут, т.е. то что было записано в store
    this.$dispatch(changeTitle($target.text())); // Так забираем текст из текущего инпута
    // Добавили debounce, теперь реже будем что то диспатчить в store
  }
}
